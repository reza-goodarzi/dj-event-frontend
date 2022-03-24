import Link from "next/link";

import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";

export default function EventsPage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?sort[0]=createdAt:asc&populate=image`);
  const { data: events } = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
