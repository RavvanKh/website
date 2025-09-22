import Image from "next/image";
import styles from "./blog-container.module.css";

const BlogContainer = ({ blog }) => {
  return (
    <article className={styles.blogDetail}>
      <header className={styles.header}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
          <span className={styles.author}>By {blog.author}</span>
          <span className={styles.date}>
            {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.categories}>
          {blog.categories.map((cat) => (
            <span key={cat.id} className={styles.category}>
              {cat.name}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.imageWrapper}>
        <Image
          src={blog.image}
          alt={blog.title}
          className={styles.image}
          fill
          priority
        />
      </div>

      <section
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogContainer;
