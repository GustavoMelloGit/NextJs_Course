import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy_data";
import EventsList from "../../../components/EventsList";
import ResultsTitle from "../../../components/ResultsTitle/results-title";

export default function EventFliter() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2015 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p className="center">Filter nor suppported</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No events found</p>;
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  );
}
