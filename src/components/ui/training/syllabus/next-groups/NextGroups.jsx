import NextGroup from "./next-group/NextGroup";
import styles from "./next-groups.module.css";

const NextGroups = ({ t, title }) => {
  const nextGroups = [
    {
      date: "16 may, 2025",
      time: "Həftəiçi",
      duration: "15:00 - 21:00",
      types: ["Online", "Office"],
    },
    {
      date: "16 may, 2025",
      time: "Həftəiçi",
      duration: "15:00 - 21:00",
      types: ["Online", "Office"],
    },
  ];
  return (
    <section className={styles.nextGroups}>
      <div className={styles.nextGroupsTitle}>{t(title)}</div>
      <div className={styles.nextGroupsContent}>
        {nextGroups.map((group, index) => (
          <NextGroup key={index} group={group} />
        ))}
      </div>
    </section>
  );
};

export default NextGroups;
