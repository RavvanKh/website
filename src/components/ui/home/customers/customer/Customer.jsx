import React from "react";

import styles from "./customer.module.css";

const Customer = ({ customer }) => {
  return (
    <div className={styles.customer}>
      <img
        src={customer?.image}
        alt={customer?.name}
        title={customer?.name}
        loading="lazy"
        className={styles.customerImage}
      />
    </div>
  );
};

export default Customer;
