"use client";
import { useState } from "react";

import Blog from "./blog/Blog";
import CustomPagination from "@/components/shared/custom-pagination/CustomPagination";

import { getPageable } from "@/lib/utils/helpers/pagination";

import styles from "./blog-list.module.css";

const BlogList = ({ blogs, isPaginationHide = false }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (blogs.length === 0) {
    return <div className={styles.notFound}>No blogs found.</div>;
  }

  const { currentItems, totalPages } = getPageable(blogs, currentPage, 6);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div
        className={`${styles.blogList} ${
          isPaginationHide ? styles.isPaginationHide : ""
        }`}
      >
        {currentItems.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      {!isPaginationHide && (
        <CustomPagination
          stackProps={{
            spacing: 2,
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
          paginationProps={{
            count: totalPages,
            page: currentPage,
            onChange: handleChange,
            color: "primary",
            variant: "outlined",
            shape: "rounded",
          }}
        />
      )}
    </div>
  );
};

export default BlogList;
