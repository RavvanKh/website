import React from "react";
import Image from "next/image";

import { filterArray } from "@/lib/utils/helpers";
import { contacts } from "@/data/contact";

import ContactSocials from "@/components/shared/contact-socials/ContactSocials";

import styles from "./contact-info.module.css";

const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.contactInfoBox}>
        {filterArray(contacts, "email")
          .slice()
          .reverse()
          .map((item) => (
            <div key={item.key} className={styles.contactInfoItem}>
              <Image
                src={item.icon}
                width={14}
                height={14}
                alt={item.key}
                className={styles.contactInfoIcon}
                priority
              />
              <div className={styles.contactInfoText}>{item.text}</div>
            </div>
          ))}
        <ContactSocials />
      </div>
    </div>
  );
};

export default ContactInfo;
