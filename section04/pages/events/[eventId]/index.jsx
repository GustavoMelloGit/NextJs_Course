import { useRouter } from "next/router";
import EventContent from "../../../components/EventDetail/event-content";
import EventLogistics from "../../../components/EventDetail/event-logistics";
import EventSummary from "../../../components/EventDetail/event-summary";
import { getEventById } from "../../../dummy_data";

export default function EventPage(props) {
  const router = useRouter();
  const { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
