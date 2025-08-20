// "use client";
import Image from "next/image";

import styles from "./certificate-card.module.css";

const CertificateCard = ({ certificate }) => {
  return (
    <section className={`${styles.certificatePage} certificatePage`}>
      <div className={`${styles.certificateWrapper} certificateWrapper`}>
        <div className={`${styles.certificateContainer} certificateContainer`}>
          <div className={styles.certificateOuterBorder}>
            <div className={styles.certificateInnerBorder}>
              <div className={styles.decorBottomLeft} />
              <div className={styles.decorTopRight} />
              <div className={styles.qrcode} />
              <div className={styles.header}>
                <div className={styles.logoAndTitle}>
                  <Image
                    src="/icons/logo.svg"
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
              <div className={styles.name}>
                {certificate?.person?.firstName} {certificate?.person?.lastName}
              </div>
              <div className={styles.nameUnderline} />
              <div className={styles.awardedText}>has been awarded to the</div>
              <div className={styles.diploma}>DIPLOMA</div>
              <div className={styles.requirements}>
                has successfully completed of requirements of
              </div>
              <div className={styles.course}>
                {certificate?.issuedFor || "Course Name"}
              </div>
              <div className={styles.courseUnderline} />
              <div className={styles.footer}>
                <div className={styles.date}>
                  {new Date(certificate?.issueDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  <div className={styles.label}>Date</div>
                </div>
                <div className={styles.signatureBlock}>
                  <div className={styles.signature}>Signature</div>
                  <div className={styles.label}>Director</div>
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
