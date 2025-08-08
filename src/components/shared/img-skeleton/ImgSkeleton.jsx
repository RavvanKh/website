"use client";
import { useState } from "react";
import Image from "next/image";

import Skeleton from "@mui/material/Skeleton";

import { aspectRatios } from "@/lib/constants/aspectRatios";

import styles from "./img-skeleton.module.css";

const ImgSkeleton = ({
  obj,
  type = "training",
  keyName,
  borderRadius = "",
  style = {},
  defaultClass = "",
}) => {

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      style={{ aspectRatio: aspectRatios?.[type], ...style }}
      className={`${styles.skeleton} ${styles?.[defaultClass]}`}
    >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={` ${styles.objImgSkeleton} ${styles?.[defaultClass]}`}
          style={{ borderRadius, ...style }}
        />
      )}

      {obj?.[keyName] && (
        <Image
          style={style}
          src={obj?.[keyName]}
          alt={obj?.name || obj?.title}
          title={obj?.name}
          fill
          className={`${styles.objImg} ${styles?.[defaultClass]} ${
            imageLoaded ? styles.loaded : ""
          }`}
          onLoad={(e) => setImageLoaded(true)}
          priority={false}
        />
      )}
    </div>
  );
};

export default ImgSkeleton;
