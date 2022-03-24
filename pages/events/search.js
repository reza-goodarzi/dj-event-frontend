import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";

import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";

export default function SearchPage({ events }) {
  const router = useRouter();
  console.log(events);
  return (
    <Layout title="Search Result">
      <Link href="/events">Go Back</Link>
      <h1>Search Result for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } },
      ],
    },
    populate: "image",
  });

  console.log(query);

  const res = await fetch(`${API_URL}/events?${query}`);
  const { data: events } = await res.json();

  return {
    props: {
      events,
    },
  };
}
