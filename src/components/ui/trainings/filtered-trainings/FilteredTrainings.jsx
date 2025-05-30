'use client'
import { useI18n } from "@/locales/client";

import Course from "@/components/shared/course/Course";
import Loader from "@/components/shared/loader/Loader";

import styles from "./filtered-trainings.module.css";


const FilteredTrainings = ({ trainings, loading }) => {
const t = useI18n()

  if (loading)
    return (
      <div className={styles.loader}>
        <Loader color="primary" size="medium" />
      </div>
    );

    if(trainings.length === 0) return (
      <div className={styles.loader}>{t("noTrainingsFound")}</div>
    )
  return (
    <section className={styles.filteredTrainings}>
      {trainings.map((training) => (
        <Course
          key={training.id}
          levelPosition="top"
          imgHeight="200px"
          imgWidth="100%"
          duration={true}
          direction="column"
          course={training}
        />
      ))}
    </section>
  );
};

export default FilteredTrainings;
