import Loader from "@/components/shared/loader/Loader";

import styles from "./global-data-wrapper.module.css";
const GlobalDataWrapper = ({ children, loading, error }) => {
  if (loading) {
    return (
      <section className={styles.loadingContainer}>
        <Loader color="primary" size="medium" />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.loadingContainer}>
        <div>{error}</div>
      </section>
    );
  }

  return children;
};

export default GlobalDataWrapper;
