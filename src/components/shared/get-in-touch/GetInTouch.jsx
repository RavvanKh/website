"use client";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import { contacts } from "@/data/contact";

import ContactSocials from "../contact-socials/ContactSocials";

import styles from "./get-in-touch.module.css";

const GetInTouch = () => {
  const t = useI18n();
  
  return (
    <div className={styles.courseApplicationLeft}>
      <div className={styles.courseApplicationLeftTop}>
        <div className={styles.courseApplicationLeftTopTitle}>
          {t("getInTouch")}
        </div>
        <p className={styles.courseApplicationLeftDescription}>
          {t("contactUsDirectlyForQuickInteraction")}
        </p>
        {contacts.map((contact) => (
          <div className={styles.courseApplicationContact} key={contact.key}>
            <div className={styles.courseApplicationContactIcon}>
              <Image src={contact.icon2} height={18} width={24} alt="Icon" />
            </div>
            <div>
              <div className={styles.contactForCourseApplicationContactKey}>
                {t(contact.key)}
              </div>
              <Link
                href={contact.url}
                className={styles.contactForCourseApplicationContactText}
              >
                {t(contact.text)}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.courseApplicationLeftBottom}>
        <div className={styles.courseApplicationLeftBottomTitle}>
          {t("socialMedia")}
        </div>
        <ContactSocials />
      </div>
    </div>
  );
};

export default GetInTouch;
