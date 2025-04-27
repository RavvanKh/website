import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./logo.module.css";

const Logo = memo(({ theme = "light", isShownBottom = false }) => {
  const titleColor = theme === "light" ? "#233131" : "#ffffff";
  const descriptionColor = theme === "light" ? "#586268" : "#EEEEEE";
  const logoBottomColor = theme === "light" ? "#233131" : "#FFFFFF";

  return (
    <div className={styles.logo}>
      <Link href="/" className={styles.logoTop}>
        <Image
          src="/icons/logo.svg"
          height={50}
          width={50}
          alt="Ingress Academy Logo"
          priority
        />
        <div className={styles.logoText}>
          <div className={styles.logoTextContainer}>
            <span className={styles.logoTextLeft} style={{ color: titleColor }}>
              Ingress
            </span>
            <span className={styles.logoTextRight}>Academy</span>
          </div>
          <div
            className={styles.logoTextBottom}
            style={{ color: descriptionColor }}
          >
            empowered by innovation
          </div>
        </div>
      </Link>
      {isShownBottom && (
        <div className={styles.logoBottom} style={{ color: logoBottomColor }}>
          Empowered by innovation
        </div>
      )}
    </div>
  );
});

export default Logo;
