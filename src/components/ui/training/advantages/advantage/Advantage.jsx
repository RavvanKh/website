import Image from "next/image";

import styles from "./advantage.module.css";

const Advantage = ({ t, advantage }) => {
  return (
    <div className={styles.advantage}>
      <Image
        src={advantage.icon}
        height={48}
        width={48}
        alt={advantage.title}
      />
      <div className={styles.advantageContent}>
        <div>{t(advantage.title)}</div>
        <p>{t(advantage.description)}</p>
      </div>
    </div>
  );
};

export default Advantage;
