import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";
import ShowCase from "./ShowCase";

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <ToastContainer />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {router.pathname === "/" && <ShowCase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Dj Events | Find the hottest party",
  description: "find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};
