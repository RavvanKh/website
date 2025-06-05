"use client";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";

import Course from "@/components/shared/course/Course";
import Loader from "@/components/shared/loader/Loader";

import styles from "./filtered-trainings.module.css";

const ITEMS_PER_PAGE = 9;

const FilteredTrainings = ({ trainings, loading }) => {
  const t = useI18n();
  const [currentPage, setCurrentPage] = useState(1); // MUI 1-dən başlayır

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader color="primary" size="medium" />
      </div>
    );
  }

  if (trainings.length === 0) {
    return <div className={styles.loader}>{t("noTrainingsFound")}</div>;
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = trainings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trainings.length / ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // istəyə görə əlavə et
  };

  return (
    <section className={styles.filteredTrainings}>
      <div className={styles.filteredTrainingsList}>
        {currentItems.map((training) => (
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
      </div>

      <div className={styles.pagination}>
        <Stack spacing={2} alignItems="center" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </section>
  );
};

export default FilteredTrainings;
