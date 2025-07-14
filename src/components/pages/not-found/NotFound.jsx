import Link from "next/link";

import { routes } from "@/lib/constants/routes";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.description}>
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href={routes.home} className={styles.button}>
        Go to Homepage
      </Link>
    </main>
  );
}
