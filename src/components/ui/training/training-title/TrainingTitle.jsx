import ImgSkeleton from "@/components/shared/img-skeleton/ImgSkeleton";

import styles from "./training-title.module.css";

const TrainingTitle = ({ training }) => {
  return (
    <section className={styles.trainingTitle}>
      <div className={styles.trainingTitleContainer}>
        <div className={styles.trainingTitleLeft}>
          <h1>{training.name}</h1>
          <p>{training.description}</p>
        </div>
        <div className={styles.trainingTitleRight}>
          <ImgSkeleton obj={training} keyName='icon' isRounded={false} borderRadius="8px"/>
        </div>
      </div>
    </section>
  );
};

export default TrainingTitle;
