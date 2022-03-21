import Layout from "../../components/Layout";
import { API_URL } from "../../config";

function Event({ evt }) {
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export default Event;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const evt = await res.json();
  return {
    props: {
      evt,
    },
    revalidate: 1,
  };
}
