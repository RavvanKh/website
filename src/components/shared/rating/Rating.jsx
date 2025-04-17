import React from "react";

import { renderStars } from "@/lib/utils/helpers";

import styles from "./rating.module.css";

const Rating = ({ rating, height = 31, width = 20 }) => {
  return (
    <div className={styles.rating}>
      <div className={styles.ratingStars} style={{height:`${height}px`}}>
        {renderStars(rating, styles.star,width,height)}
      </div>
      <div className={styles.ratingNumber}>
        <div className={styles.ratingCount}>{rating}</div>
        <div className={styles.ratingMax}>/5</div>
      </div>
    </div>
  );
};

export default Rating;
