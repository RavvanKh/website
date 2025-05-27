import { convertStartEndTime, convertStringToDate } from "@/lib/utils/helpers";
import { SESSION_DAY_TYPE, SESSION_LOCATION_TYPE } from "@/lib/constants/enum";

import styles from "./next-group.module.css";


const NextGroup = ({ t, group, onClick }) => {
  const formatted = convertStringToDate(group.startDate);

  const hour = convertStartEndTime(group.startHour, group.endHour);

  return (
    <div className={styles.nextGroup}>
      <div className={styles.nextGroupTop}>
        <div>{formatted}</div>
        <button onClick={onClick}>{t("apply")}</button>
      </div>
      <div className={styles.nextGroupContent}>
        <div>{t("trainingDays")}</div>
        <p>{t(SESSION_DAY_TYPE[group.sessionDayType])}</p>
      </div>
      <div className={styles.nextGroupContent}>
        <div>{t("trainingHours")}</div>
        <p>{hour}</p>
      </div>
      <div className={styles.nextGroupType}>
        {group.sessionLocationType.map((type, index) => (
          <div key={index}>{t(SESSION_LOCATION_TYPE[type])}</div>
        ))}
      </div>
    </div>
  );
};

export default NextGroup;
