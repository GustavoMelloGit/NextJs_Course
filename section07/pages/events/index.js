import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { returnArrrayOfEvents } from "../../helpers/utils";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All events</title>
        <meta name="description" content="This is all events" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await returnArrrayOfEvents();
  return {
    props: {
      events,
    },
    revalidate: 300,
  };
}
export default AllEventsPage;
