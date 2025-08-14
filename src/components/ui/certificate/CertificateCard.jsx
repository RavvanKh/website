"use client";

import React from "react";
import styles from "../../pages/certificate/certificate.module.css";
import Image from "next/image";

const logo = "/icons/logo.svg";

const CertificateCard = ({ certificate }) => {
  return (
    <section className={styles.certificatePage}>
      <div className={styles.certificateWrapper}>
        <div className={styles.certificateContainer}>
          <div className={styles.certificateOuterBorder}>
            <div className={styles.certificateInnerBorder}>
              <div className={styles.decorBottomLeft} />
              <div className={styles.decorTopRight} />
              <div className={styles.qrcode} />
              <div className={styles.header}>
                <div className={styles.logoAndTitle}>
                  <Image
                    src={logo}
                    height={86}
                    width={86}
                    alt="Ingress Academy Logo"
                    priority
                  />
                  <div>
                    <span className={styles.ingress}>INGRESS</span>
                    <span className={styles.academy}> ACADEMY</span>
                    <div className={styles.slogan}>empowered by innovation</div>
                  </div>
                </div>
              </div>
              <div className={styles.name}>{certificate.name}</div>
              <div className={styles.nameUnderline} />
              <div className={styles.awardedText}>
                {certificate.awardedText}
              </div>
              <div className={styles.diploma}>{certificate.diploma}</div>
              <div className={styles.requirements}>
                {certificate.requirements}
              </div>
              <div className={styles.course}>{certificate.course}</div>
              <div className={styles.courseUnderline} />
              <div className={styles.footer}>
                <div>
                  <div className={styles.date}>{certificate.date}</div>
                  <div className={styles.label}>Date</div>
                </div>
                <div className={styles.signatureBlock}>
                  <div className={styles.signature}>
                    {certificate.signature}
                  </div>
                  <div className={styles.label}>{certificate.director}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateCard;
