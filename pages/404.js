import { FaExclamationTriangle } from "react-icons/fa";
import styles from "../styles/404.module.css";
import Link from "next/link";
import Layout from "../components/Layout";

function NotFound() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">GO BACK HOME</Link>
      </div>
    </Layout>
  );
}

export default NotFound;
