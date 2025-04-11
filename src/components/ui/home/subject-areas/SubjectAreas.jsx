"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import { getCategories } from "@/lib/utils/api/categories";
import { getRandomItems } from "@/lib/utils/helpers";

import Loader from "@/components/shared/loader/Loader";
import Categories from "../categories/Categories";

import styles from "./subject-areas.module.css";
import Link from "next/link";

const SubjectAreas = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomCategories, setRandomCategories] = useState([]);

  const t = useI18n();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories(0, 100);
        const all = data?.content || [];
        setCategories(all);
        const random = getRandomItems(all, 8);
        setRandomCategories(random);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className={styles.subjectAreas}>
      <div className={styles.subjectAreasTitle}>{t("subjectAreas")}</div>
      <div className={styles.subjectAreasList}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader size="medium" color="primary" />
          </div>
        ) : error ? (
          <div className={styles.errorMessage}>
            Failed to load categories: {error}
          </div>
        ) : (
          <Categories categories={randomCategories} />
        )}
      </div>
      <Link
        href="/categories"
        className={styles.subjectAreasExploreFullCatalog}
      >
        <div className={styles.subjectAreasExploreFullCatalogContent}>
          {t("exploreFullCatalog")}
        </div>
        <Image
          src="/icons/arrow-top-right.svg"
          height={20}
          width={20}
          alt="Arrow"
        />
      </Link>
    </section>
  );
};

export default SubjectAreas;
