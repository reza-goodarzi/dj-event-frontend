import Link from "next/link";
import Image from "next/image";
import styles from "./EventItem.module.css";

function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image : "/image/event-default.pn"}
          width={170}
          height={100}
          alt={evt.name}
        />
      </div>

      <div className={styles.info}>
        <h3>{evt.name}</h3>
        <span>
          {evt.date} at {evt.time}
        </span>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
