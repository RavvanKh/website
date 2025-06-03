"use client";
import Image from "next/image";

import { useGlobalData } from "@/contexts/GlobalDataContext";

import { filterArray } from "@/lib/utils/helpers";
import { contacts } from "@/lib/constants/contact";

import ContactSocials from "@/components/shared/contact-socials/ContactSocials";

import styles from "./contact-info.module.css";

const ContactInfo = () => {
  const {
    data: { organization },
  } = useGlobalData();

  const dynamicData = {
    phone: organization?.phoneNumbers?.[0],
    location: organization?.addresses?.[0]?.streetAddress,
  };

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
              <div className={styles.contactInfoText}>
                {dynamicData?.[item.key]}
              </div>
            </div>
          ))}
        <ContactSocials />
      </div>
    </div>
  );
};

export default ContactInfo;
