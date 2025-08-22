import Image from "next/image";

import QrCode from "@/components/shared/qr-code/QrCode";

import styles from "./certificate-card.module.css";

const CertificateCard = ({ certificate }) => {
  return (
    <section className={styles.certificatePage}>
      <div className={styles.certificateWrapper}>
        <div className={styles.certificateContainer}>
          <div className={styles.certificateOuterBorder}>
            <div className={styles.certificateInnerBorder}>
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
              <div className={styles.awardedText}>has been awarded the</div>
              <div className={styles.diploma}>DIPLOMA</div>
              <div className={styles.requirements}>
                for successfully completing the requirements of
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
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                  <div className={styles.label}>Issue Date</div>
                </div>
                <div className={styles.signatureBlock}>
                  <div className={styles.signature}>Signature</div>
                  <div className={styles.label}>Director</div>
                </div>
              </div>
              <div className={styles.qrContainer}>
                <div className={styles.qrcode}>
                  <QrCode url={window.location.href} />
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
