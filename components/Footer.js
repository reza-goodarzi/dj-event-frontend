import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyrights &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">About this project</Link>
      </p>
    </footer>
  );
}

export default Footer;
