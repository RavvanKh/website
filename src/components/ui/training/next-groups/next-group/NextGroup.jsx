import { convertStartEndTime, convertStringToDate } from "@/lib/utils/helpers";

import styles from "./next-group.module.css";

const NextGroup = ({t, group, onClick }) => {
  const formatted = convertStringToDate(group.startDate);

  const hour = convertStartEndTime(group.startHour, group.endHour);

  return (
    <div className={styles.nextGroup}>
      <div className={styles.nextGroupTop}>
        <div>{formatted}</div>
        <button onClick={onClick}>Apply</button>
      </div>
      <div className={styles.nextGroupContent}>
        <div>{t("lessonDays")}</div>
        <p>{group.sessionDayType}</p>
      </div>
      <div className={styles.nextGroupContent}>
        <div>{t("lessonHours")}</div>
        <p>{hour}</p>
      </div>
      <div className={styles.nextGroupType}>
        {group.sessionLocationType.map((type, index) => (
          <div key={index}>{type}</div>
        ))}
      </div>
    </div>
  );
};

export default NextGroup;
