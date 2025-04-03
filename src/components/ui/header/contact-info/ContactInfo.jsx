import React from "react";
import Image from "next/image";
import Link from "next/link";

import { contact, contactSocials } from "@/data/contact";

import styles from "./contact-info.module.css";

const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.contactInfoBox}>
        {contact.map((item) => (
          <div key={item.key} className={styles.contactInfoItem}>
            <Image
              src={item.icon}
              width={14}
              height={14}
              alt={item.key}
              className={styles.contactInfoIcon}
            />
            <span className={styles.contactInfoText}>{item.text}</span>
          </div>
        ))}
        <div className={styles.contactInfoSocials}>
            {contactSocials.map((item) => (
                <Link href={item.link} key={item.key} title={item.key} target='_blank' rel='noopener noreferrer'>
                <item.icon height={24} width={24} color='black'/>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
