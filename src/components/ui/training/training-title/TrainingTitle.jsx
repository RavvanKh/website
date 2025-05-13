import styles from "./training-title.module.css";

const TrainingTitle = ({ training }) => {
  return (
    <section className={styles.trainingTitle}>
      <div className={styles.trainingTitleContainer}>
        <div className={styles.trainingTitleLeft}>
          <h2>{training.name}</h2>
          <p>{training.title}</p>
        </div>
        <div className={styles.trainingTitleRight}>
          <img alt={training.name} src={training.icon} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
};

export default TrainingTitle;
