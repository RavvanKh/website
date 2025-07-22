import React from "react";
import styles from "./certificate.module.css";
import Image from "next/image";
const logo = "/icons/logo.svg";

const Certificate = () => {
  return (
    <div className={styles.certificateWrapper}>
      <div className={styles.certificate}>
        <div className={styles.header}>
          <div className={styles.logoAndTitle}>
            <Image
              src={logo}
              height={50}
              width={50}
              alt="Ingress Academy Logo"
              priority
            />
            <div>
              <span className={styles.ingress}>INGRESS</span>
              <span className={styles.academy}> ACADEMY</span>
            </div>
          </div>
          <div className={styles.slogan}>empowered by innovation</div>
        </div>
        <div className={styles.name}>TOFIG MIKAYILZADA</div>
        <div className={styles.awardedText}>has been awarded to the</div>
        <div className={styles.diploma}>DIPLOMA</div>
        <div className={styles.requirements}>
          has successfully completed of requirements of
        </div>
        <div className={styles.course}>
          Advanced Backend &amp; Microservices Development
        </div>
        <div className={styles.footer}>
          <div>
            <div className={styles.date}>28.06.2025</div>
            <div className={styles.label}>Date</div>
          </div>
          <div className={styles.signatureBlock}>
            <div className={styles.signature}>Signature</div>
            <div className={styles.label}>Director</div>
          </div>
        </div>
        <div className={styles.decorTopRight}></div>
        <div className={styles.decorBottomLeft}></div>
      </div>
    </div>
  );
};

export default Certificate;
