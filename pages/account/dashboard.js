import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import DashboardEvent from "../../components/DashboardEvent";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import { parseCookies } from "../../helper";
import styles from "../../styles/Dashboard.module.css";

function DashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Events Deleted.");
      router.reload();
    }
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

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: events } = await res.json();

  return {
    props: { events, token },
  };
}
