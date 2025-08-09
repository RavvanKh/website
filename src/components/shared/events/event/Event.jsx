import Image from "next/image";
import { format } from "date-fns";
import { az } from "date-fns/locale";

import ImgSkeleton from "../../img-skeleton/ImgSkeleton";

import styles from "./event.module.css";

const Event = ({ event, t }) => {
  const formattedDate = format(new Date(event.time), "d MMMM, yyyy", {
    locale: az,
  }).toLowerCase();

  return (
    <div className={styles.event}>
      <div className={styles.eventImage}>
        <ImgSkeleton obj={event} keyName={"image"} defaultClass="event" />
      </div>
      <div className={styles.eventContent}>
        <article className={styles.eventInfo}>
          <div className={styles.eventInfoTop}>
            <div className={styles.eventIcon}>
              <Image
                src={"/icons/event.svg"}
                alt="event"
                width={16}
                height={16}
              />
              <span>{t("events")}</span>
            </div>
            <div className={styles.eventSpeaker}>
              <Image
                src={"/icons/user.svg"}
                alt="event"
                width={16}
                height={16}
              />
              <span>{t("Ravan Khaligov")}</span>
            </div>
          </div>
          <div className={styles.eventTitle}>{event?.title}</div>
          <div className={styles.eventDescription}>{event?.description}</div>
        </article>
        <div className={styles.eventDetail}>
          <div className={styles.eventDetailItem}>
            <Image
              src={"/icons/calendar.svg"}
              height={16}
              width={16}
              alt="Calendar"
            />
            <p>{formattedDate}</p>
          </div>
          <div className={styles.eventDetailItem}>
            <Image
              src={"/icons/location-dark.svg"}
              height={16}
              width={16}
              alt="Location"
            />
            <p>{event.place}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
