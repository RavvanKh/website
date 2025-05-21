import Advantage from "./advantage/Advantage";

import styles from "./advantages.module.css";

const Advantages = ({ t, title, advantages }) => {
  return (
    <section className={styles.advantages}>
      <div className={styles.advantagesTop}>{t(title)}</div>
      <div className={styles.advantagesContent}>
        {advantages.map((advantage, index) => (
          <Advantage t={t} advantage={advantage} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Advantages;
