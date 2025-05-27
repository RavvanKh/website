import Loader from "@/components/shared/loader/Loader";
import Customer from "../../home/customers/customer/Customer";

import styles from "./companies.module.css";

const Companies = ({ t, title, companies, loading, error }) => {
  return (
    <section className={styles.companies}>
      <div className={styles.companiesTop}>
        <div className={styles.companiesTitle}>{t("graduatesTitle")}</div>
        <p>{t("graduatesDescription")}</p>

      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div>Failed to load companies : {error}</div>
      ) : (
        <div className={styles.companiesList}>
          {companies.map(({company}, index) => (
            <Customer customer={company} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Companies;
