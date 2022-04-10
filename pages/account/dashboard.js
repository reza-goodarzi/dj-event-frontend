import React from "react";
import DashboardEvent from "../../components/DashboardEvent";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import { parseCookies } from "../../helper";
import styles from "../../styles/Dashboard.module.css";

function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me?populate=image`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: events } = await res.json();

  return {
    props: { events },
  };
}
