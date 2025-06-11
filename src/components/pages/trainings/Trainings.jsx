"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useI18n } from "@/locales/client";
import { useGlobalData } from "@/contexts/GlobalDataContext";

import Filters from "@/components/ui/trainings/filters/Filters";
import FilteredTrainings from "@/components/ui/trainings/filtered-trainings/FilteredTrainings";
import CourseTypes from "@/components/ui/home/our-courses/course-types/CourseTypes";

import { filterOptions } from "@/lib/constants/filterOptions";

import styles from "./trainings.module.css";



const Trainings = () => {
  const {
    data: { courses, categories },
  } = useGlobalData();

  const t = useI18n()

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [filters, setFilters] = useState(filterOptions);

  const useUrlParams = (searchParams) => {
    return useMemo(
      () => ({
        category: searchParams.getAll("category") || [],
        type: searchParams.getAll("type") || [],
        level: searchParams.getAll("level") || [],
      }),
      [searchParams]
    );
  };

  const urlParams = useUrlParams(searchParams);

  const [filter, setFilter] = useState({
    category: urlParams.category,
    type: urlParams.type,
    level: urlParams.level,
  });

  const updateFilter = (name, value) => {

    const updatedFilter = { ...filter, [name]: value };

    const params = new URLSearchParams();

    Object.keys(updatedFilter).forEach((paramName) => {
      const paramValue = updatedFilter[paramName];

      if (Array.isArray(paramValue) && paramValue.length > 0) {
        paramValue.forEach((val) => {
          params.append(paramName, val);
        });
      }
    });

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(newUrl, { scroll: false });
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const filteredData = courses.filter((course) => {
      const matchesCategory =
        filter.category.length === 0 ||
        filter.category.some((category) =>
          course.tags?.some((tag) => tag.includes(`category:${category}`))
        );

      const matchesLevel =
        filter.level.length === 0 ||
        filter.level.includes(course.level.toLowerCase());

      const matchesType =
        filter.type.length === 0 || filter.type.includes(course.type);

      return matchesCategory && matchesLevel && matchesType;
    });

    setFilteredTrainings(filteredData);
  }, [filter.category, filter.level, filter.type, courses]);

  useEffect(() => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (filter.key === "category") {
          return {
            ...filter,
            options: categories.map((category) => ({
              id: category.id,
              key: category.name,
            })),
          };
        }
        return filter;
      })
    );
  }, [categories]);

  return (
    <section className={styles.trainings}>
      <CourseTypes t={t} selectedType={filter.type} onClick={updateFilter} />
      <div className={styles.trainingsContent}>
        <Filters
        trainings={filteredTrainings}
          activeFilter={filter}
          filters={filters}
          onClick={updateFilter}
        />
        <FilteredTrainings trainings={filteredTrainings} />
      </div>
    </section>
  );
};

export default Trainings;
