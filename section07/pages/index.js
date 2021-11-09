import Head from "next/head";
import EventList from "../components/events/event-list";
import {
  fetchEvents,
  getFeaturedEvents,
  transformObjectToArray,
} from "../helpers/utils";

function HomePage(props) {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>Featured events</title>
        <meta
          name="description"
          content="Find a lot of events that might interest you"
        />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const events = await fetchEvents();
  const transformedEvents = transformObjectToArray(events);
  const featuredEvents = getFeaturedEvents(transformedEvents);
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
