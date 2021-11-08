import EventsList from "../components/EventsList";
import { getFeaturedEvents } from "../dummy_data";

export default function Home() {
  const featureEvents = getFeaturedEvents();
  return (
    <div>
      <EventsList items={featureEvents} />
    </div>
  );
}
