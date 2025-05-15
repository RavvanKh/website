import styles from "./next-group.module.css";

const NextGroup = ({ group,onClick }) => {
  return (
    <div className={styles.nextGroup}>
      <div className={styles.nextGroupTop}>
        <div>{group.date}</div>
        <button onClick={onClick}>Apply</button>
      </div>
      <div className={styles.nextGroupContent}>
        <div>Dərs günləri</div>
        <p>{group.time}</p>
      </div>
      <div className={styles.nextGroupContent}>
        <div>Dərs saatları</div>
        <p>{group.duration}</p>
      </div>
      <div className={styles.nextGroupType}>
        {group.types.map((type, index) => (
          <div key={index}>{type}</div>
        ))}
      </div>
    </div>
  );
};

export default NextGroup;
