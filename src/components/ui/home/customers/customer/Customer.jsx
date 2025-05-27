import ImgSkeleton from "@/components/shared/img-skeleton/ImgSkeleton";

import styles from "./customer.module.css";

const Customer = ({ customer }) => {
  return (
    <div className={styles.customer}>
      <ImgSkeleton obj={customer} keyName="image" isRounded={false} />
    </div>
  );
};

export default Customer;
