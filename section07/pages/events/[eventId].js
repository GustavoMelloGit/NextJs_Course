import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import {
  getEventById,
  getFeaturedEvents,
  returnArrrayOfEvents,
} from "../../helpers/utils";

function EventDetailPage(props) {
  const { event } = props;
  if (!event) {
    return (
      <ErrorAlert>
        <Head>
          <title>Event not found</title>
        </Head>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  try {
    const event = await getEventById(eventId);
    return {
      props: {
        event,
      },
      revalidate: 180,
    };
  } catch (e) {
    return {
      props: {
        event: null,
      },
      revalidate: 180,
    };
  }
}

export async function getStaticPaths() {
  const events = await returnArrrayOfEvents();
  const featuredEvents = getFeaturedEvents(events);

  const paths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}
