import { getAllEvents } from "../../dummy_data";
import EventList from "../../components/EventsList";
import EventsSearch from "../../components/EventsSearch";
import { useRouter } from "next/router";

export default function Events() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}
