import { counts } from "@/lib/constants/info";

import Count from "./count/Count";

import styles from "./counts.module.css";

const Counts = ({countMeta}) => {
  const combined = counts.map((meta) => ({
    ...meta,
    count: countMeta[meta.key] ?? meta.count,
  }));
  return (
    <section className={styles.counts}>
      {combined.map((count,index) => (
        <Count
          key={count.key}
          count={count}
          isLast={index === counts.length - 1}
         />
      ))}
    </section>
  );
};

export default Counts;
