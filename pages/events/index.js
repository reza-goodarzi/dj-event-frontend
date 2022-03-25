import EventItem from "../../components/EventItem";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { API_URL, PER_PAGE } from "../../config";

export default function EventsPage({ events, page, lastPage }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} lastPage={lastPage} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const res = await fetch(
    `${API_URL}/events?sort[0]=createdAt:asc&populate=image&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
  );
  const { data: events, meta } = await res.json();

  return {
    props: {
      events,
      page: +page,
      total: meta.pagination.total,
      lastPage: meta.pagination.pageCount,
    },
  };
}
