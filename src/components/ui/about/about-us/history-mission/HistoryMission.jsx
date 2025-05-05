import { aboutUs } from "@/data/aboutUs";

import WhyChooseUsDetail from "@/components/shared/why-choose-us-detail/WhyChooseUsDetail";

import styles from "./history-mission.module.css";

const HistoryMission = () => {
  return (
    <section className={styles.historyMission}>
      <div className={styles.historyMissionContainer}>
        {aboutUs.map((item, index) => (
          <div key={index} className={styles.historyMissionItem}>
            <WhyChooseUsDetail index={index} item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryMission;
