"use client";
import { useState } from "react";
import Image from "next/image";

import Skeleton from "@mui/material/Skeleton";

import styles from "./img-skeleton.module.css";
import { aspectRatios } from "@/lib/constants/aspectRatios";

const ImgSkeleton = ({
  obj,
  type = "training",
  keyName,
  isRounded = false,
  borderRadius = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      style={{ aspectRatio: aspectRatios?.[type] }}
      className={`${styles.skeleton} ${isRounded ? styles.rounded : ""}`}
    >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={styles.objImgSkeleton}
          style={{ borderRadius }}
        />
      )}

      {obj?.[keyName] && (
        <Image
          src={obj?.[keyName]}
          alt={obj?.name}
          title={obj?.name}
          fill
          sizes="100%"
          className={`${styles.objImg} ${imageLoaded ? styles.loaded : ""}`}
          onLoad={(e) => setImageLoaded(true)}
          priority={false}
        />
      )}
    </div>
  );
};

export default ImgSkeleton;
