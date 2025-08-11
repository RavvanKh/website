'use client'
import Loader from "@/components/shared/loader/Loader";
import Error from "@/components/shared/error/Error"

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
        <Error/>
      </section>
    );
  }

  return children;
};

export default GlobalDataWrapper;
