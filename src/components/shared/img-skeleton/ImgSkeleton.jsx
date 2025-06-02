"use client";
import { useState } from "react";

import Skeleton from "@mui/material/Skeleton";

import styles from "./img-skeleton.module.css";

const ImgSkeleton = ({
  obj,
  keyName,
  isRounded = false,
  borderRadius = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`${styles.skeleton} ${isRounded ? styles.rounded : ""}`}>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={styles.objImgSkeleton}
          style={{ borderRadius }}
        />
      )}

      <img
        className={styles.objImg}
        src={obj?.[keyName]}
        alt={obj?.name}
        loading="lazy"
        title={obj?.name}
        onLoad={() => setImageLoaded(true)}
        style={{
          opacity: imageLoaded ? 1 : 0,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ImgSkeleton;
