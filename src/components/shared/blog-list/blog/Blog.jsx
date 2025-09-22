import Link from "next/link";
import Image from "next/image";

import { routes } from "@/lib/constants/routes";

import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  return (
    <Link href={`${routes.blogs}/${blog?.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{blog.title}</h2>
        <p className={styles.description}>{blog.description}</p>
        <div className={styles.meta}>
          <span>By {blog.author}</span> • <span>{blog.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
