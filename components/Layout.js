import Head from "next/head";
import styles from "./Layout.module.css";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Dj Events | Find the hottest party",
  description: "find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};
