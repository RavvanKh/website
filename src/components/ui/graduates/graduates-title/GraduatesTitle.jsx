import React from "react";
import Image from "next/image";
import styles from "./graduates-title.module.css";
import { useGlobalData } from "@/contexts/GlobalDataContext";

export default function GraduatesTitle() {
  const { data } = useGlobalData();

  // Shuffle and pick 3 random instructors from the already-fetched list
  const instructors = data.instructors || [];
  const randomInstructors = React.useMemo(() => {
    if (instructors.length < 3) return instructors;
    const shuffled = [...instructors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [instructors]);

  return (
    <section className={styles.graduatesTitle}>
      <div className={styles.graduatesContent}>
        <div className={styles.diamondLayout}>
          {/* Big left diamond */}
          <div className={styles.bigDiamond}>
            <div className={styles.bigDiamondImageWrapper}>
              <Image
                src="/images/close-up-graduation-certificate.svg"
                alt="Certificate"
                fill
                className={styles.bigDiamondImage}
                priority
              />
            </div>
          </div>
          {/* Top small diamond */}
          <div className={`${styles.smallDiamond} ${styles.topDiamond}`}>
            <div className={styles.smallDiamondImageWrapper}>
              {randomInstructors[0]?.image && (
                <Image
                  src={randomInstructors[0].image}
                  alt={randomInstructors[0].name}
                  fill
                  className={styles.smallDiamondImage}
                  sizes="100%"
                />
              )}
            </div>
          </div>
          {/* Right small diamond */}
          <div className={`${styles.smallDiamond} ${styles.rightDiamond}`}>
            <div className={styles.smallDiamondImageWrapper}>
              {randomInstructors[1]?.image && (
                <Image
                  src={randomInstructors[1].image}
                  alt={randomInstructors[1].name}
                  fill
                  className={styles.smallDiamondImage}
                  sizes="100%"
                />
              )}
            </div>
          </div>
          {/* Bottom small diamond */}
          <div className={`${styles.smallDiamond} ${styles.bottomDiamond}`}>
            <div className={styles.smallDiamondImageWrapper}>
              {randomInstructors[2]?.image && (
                <Image
                  src={randomInstructors[2].image}
                  alt={randomInstructors[2].name}
                  fill
                  className={styles.smallDiamondImage}
                  sizes="100%"
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.graduatesText}>
          <h2>
            <span className={styles.blue}>Our graduates</span> reflect our{" "}
            values.
          </h2>
          <p>
            Our graduates succeed thanks to energetic instructors who share
            real-world experience and practical skills, preparing them to excel
            from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
