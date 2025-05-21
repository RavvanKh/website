import NextGroup from "./next-group/NextGroup";

import styles from "./next-groups.module.css";

const NextGroups = ({ t, title, onClickApply, nextGroups }) => {

  
  return (
    <section className={styles.nextGroups}>
      <div className={styles.nextGroupsTitle}>{t(title)}</div>
      <div className={styles.nextGroupsContent}>
        {nextGroups.map((group, index) => (
          <NextGroup key={index} group={group} onClick={onClickApply} />
        ))}
      </div>
    </section>
  );
};

export default NextGroups;
