"use client";

import React, { useState } from "react";
import styles from "./certificate.module.css";
import Image from "next/image";
import { certificateMockData } from "../../../lib/constants/certificateMock";

const logo = "/icons/logo.svg";

const Certificate = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Use mock data
  const { certificate, certificateDetails, aboutCertificate, share } =
    certificateMockData;

  // Handle sharing to social media platforms
  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(share.shareText);

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      default:
        return;
    }

    // Open in a new tab
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Handle copying the link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        // Reset success message after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

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
      <section className={styles.certificateCardSection}>
        <div className={styles.certificateCard}>
          {/* Left: Certificate Details */}
          <div className={styles.cardColumn}>
            <h2 className={styles.cardTitle}>Certificate Details</h2>
            <div className={styles.cardItem}>
              <span className={styles.cardIcon}>👤</span>
              <div>
                <div className={styles.cardLabel}>Certificate Holder</div>
                <div className={styles.cardValue}>
                  {certificateDetails.holder.name}
                </div>
                <div className={styles.cardSubValue}>
                  {certificateDetails.holder.email}
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardIcon}>📅</span>
              <div>
                <div className={styles.cardLabel}>Issue Date</div>
                <div className={styles.cardValue}>
                  {certificateDetails.issueDate}
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardIcon}>🛡️</span>
              <div>
                <div className={styles.cardLabel}>Credential ID</div>
                <div className={styles.cardCredential}>
                  {certificateDetails.credentialId}
                </div>
              </div>
            </div>
          </div>
          {/* Right: About This Certificate */}
          <div className={styles.cardColumn}>
            <h2 className={styles.cardTitle}>About This Certificate</h2>
            <div className={styles.cardItem}>
              <span className={styles.cardIcon}>📝</span>
              <div>
                <div className={styles.cardLabel}>Description</div>
                <div className={styles.cardDescription}>
                  {aboutCertificate.description}
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardIcon}>🏅</span>
              <div>
                <div className={styles.cardLabel}>Skills Covered</div>
                <div className={styles.cardSkills}>
                  {aboutCertificate.skills.map((skill, index) => (
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
                  {aboutCertificate.issuingOrganization}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Share content via social media like whatsapp, linkedin, link, etc */}
      <section className={styles.shareSection}>
        <div className={styles.shareContainer}>
          <h2 className={styles.shareTitle}>{share.title}</h2>
          <p className={styles.shareDescription}>{share.description}</p>
          <div className={styles.shareButtons}>
            <button
              className={styles.shareButton}
              aria-label="Share on WhatsApp"
              onClick={() => handleShare("whatsapp")}
            >
              <Image
                src="/icons/WhatsApp.webp"
                width={24}
                height={24}
                alt="WhatsApp"
              />
              <span>WhatsApp</span>
            </button>
            <button
              className={styles.shareButton}
              aria-label="Share on LinkedIn"
              onClick={() => handleShare("linkedin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#0A66C2"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </button>
            <button
              className={styles.shareButton}
              aria-label="Share on Facebook"
              onClick={() => handleShare("facebook")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <span>Facebook</span>
            </button>
            <button
              className={styles.copyLinkButton}
              aria-label="Copy Link"
              onClick={handleCopyLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#555"
              >
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
              <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Certificate;
