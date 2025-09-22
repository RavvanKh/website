"use client";
import { useI18n } from "@/locales/client";

import BlogList from "@/components/shared/blog-list/BlogList";

import { blogs } from "@/components/pages/blogs/Blogs";

import styles from "./blogs.module.css";

const Blogs = () => {
  const t = useI18n();

  return (
    <section className={styles.blogsSection}>
      <h3>{t("blogs")}</h3>
      <BlogList blogs={blogs.slice(0, 3)} isPaginationHide={true} />
    </section>
  );
};

export default Blogs;
