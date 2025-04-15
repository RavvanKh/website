import React from "react";

import styles from "./detail.module.css";

const Detail = ({ item,index }) => {
  return (
    <div style={{marginLeft:`${index*82}px`}} className={styles.whyChooseUsDetailItem}>
    <div className={styles.whyChooseUsDetailItemAbsoluteBorder}/>
      <div className={styles.whyChooseUsDetailItemTitle}>{item?.title}</div>
      <div className={styles.whyChooseUsDetailItemDescription}>
        {item?.description}
      </div>
    </div>
  );
};

export default Detail;
