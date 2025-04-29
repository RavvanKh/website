"use client";
import React from "react";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import { navbarItems } from "@/data/navbar";
import {contacts, contactSocials } from "@/data/contact";
import { filterArray } from "@/lib/utils/helpers";

import Logo from "@/components/shared/logo/Logo";

import styles from "./footer.module.css";

const Footer = () => {
  const t = useI18n();
  const currentYear = new Date().getFullYear();
  const footerText = `© ${currentYear} All rights reserved.`;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTopContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopLeft}>
            <Logo theme="dark" isShownBottom={true} />
            <div className={styles.footerPages}>
              <div>{t("company")}</div>
              {navbarItems.map((item) => (
                <Link href={`/${item.key}`} key={item.key}>
                  {t(item.key)}
                </Link>
              ))}
            </div>
            <div className={styles.footerContact}>
              <div>{t("contactUs")}</div>
              {contacts
                .slice()
                .reverse()
                .map((item) => (
                  <Link href={item.url} key={item.key}>
                    {item.text}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.footerTopRight}>
            {filterArray(contactSocials).map((item) => (
              <Link
                rel="noopener noreferrer"
                title={item.key}
                href={item.url}
                className={styles.footerTopRightSocials}
                key={item.key}
                data-social={item.key}
              >
                <item.icon
                  alt={item.key}
                  height={20}
                  width={20}
                  color="black"
                  size={20}
                  className={styles.footerTopRightSocialsIcon}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottom}>{footerText}</div>
      </div>
    </footer>
  );
};

export default Footer;
