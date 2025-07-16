"use client";

import CourseApplication from "@/components/shared/course-application/CourseApplication";
import styles from "./graduates.module.css";
import Image from "next/image";
import Customers from "@/components/ui/home/customers/Customers";
import { useGlobalData } from "@/contexts/GlobalDataContext";

const Graduates = () => {
  const { data, error, loading } = useGlobalData();

  return (
    <>
      <section className={styles.graduates}>
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
            <div
              className={`${styles.smallDiamond} ${styles.topDiamond}`}
            ></div>
            {/* Right small diamond */}
            <div
              className={`${styles.smallDiamond} ${styles.rightDiamond}`}
            ></div>
            {/* Bottom small diamond */}
            <div
              className={`${styles.smallDiamond} ${styles.bottomDiamond}`}
            ></div>
          </div>
          <div className={styles.graduatesText}>
            <h2>
              <span className={styles.blue}>Our graduates</span> reflect our{" "}
              values.
            </h2>
            <p>
              Our graduates succeed thanks to energetic instructors who share
              real-world experience and practical skills, preparing them to
              excel from day one.
            </p>
          </div>
        </div>
        <Customers
          className={styles.graduatesCustomers}
          customers={data.customers}
          loading={loading.home}
          error={error.home}
        />
        <CourseApplication />
      </section>
    </>
  );
};

export default Graduates;
