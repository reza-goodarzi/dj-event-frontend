import Link from "next/link";
import Image from "next/image";

import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import styles from "../../styles/Event.module.css";

import { FaPencilAlt, FaTimes } from "react-icons/fa";

function Event({ evt }) {
  console.log(evt);
  const deleteEvent = (e) => {
    console.log("Delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Events
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Events
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} width={960} height={600} alt={evt.name} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>

        <h3>Description:</h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export default Event;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const { data: events } = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?filters[slug]=${slug}&populate=image`);
  const { data: evt } = await res.json();
  return {
    props: {
      evt: evt[0],
    },
    revalidate: 1,
  };
}
