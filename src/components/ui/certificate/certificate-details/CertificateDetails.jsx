"use client";
import styles from "./certificate-details.module.css";

const CertificateDetails = ({ certificate }) => {
  return (
    <section className={styles.certificateCardSection}>
      <div className={styles.certificateCard}>
        <div className={styles.cardColumn}>
          <h2 className={styles.cardTitle}>Certificate Details</h2>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>👤</span>
            <div>
              <div className={styles.cardLabel}>Certificate Holder</div>
              <div className={styles.cardValue}>
                {certificate?.person?.firstName} {certificate?.person?.lastName}
              </div>
              <div className={styles.cardSubValue}>
                {certificate?.person?.emailAddress}
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>📅</span>
            <div>
              <div className={styles.cardLabel}>Issue Date</div>
              <div className={styles.cardValue}>
                {new Date(certificate?.issueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>🛡️</span>
            <div>
              <div className={styles.cardLabel}>Credential ID</div>
              <div className={styles.cardCredential}>
                {certificate?.credentialId}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardColumn}>
          <h2 className={styles.cardTitle}>About This Certificate</h2>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>📝</span>
            <div>
              <div className={styles.cardLabel}>Description</div>
              <div className={styles.cardDescription}>
                {certificate?.description}
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>🏅</span>
            <div>
              <div className={styles.cardLabel}>Skills Covered</div>
              <div className={styles.cardSkills}>
                {certificate?.skills?.map((skill, index) => (
                  <span key={index} className={styles.cardSkill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardIcon}>🏢</span>
            <div>
              <div className={styles.cardLabel}>Issuing Organization</div>
              <div className={styles.cardValue}>
                {certificate?.issuingOrganization}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateDetails;
