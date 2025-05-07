"use client";
import { useEffect, useRef, useState } from "react";

import { getInstructors } from "@/lib/utils/api/instructors";
import { getLimitByWidth } from "@/lib/utils/helpers";

import InstructorsContent from "@/components/shared/instructors-content/InstructorsContent";
import Loader from "@/components/shared/loader/Loader";
import Instructor from "@/components/shared/instructor/Instructor";

import styles from "./instructors.module.css";



const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previousLimitRef = useRef(null);

  const fetchInstructors = async (limit) => {
    try {
      setLoading(true);
      const res = await getInstructors(0, limit);
      setInstructors(res?.content);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  
  
  useEffect(() => {
  
    const handleResize = () => {
      const newLimit = getLimitByWidth(window.innerWidth);
      if (previousLimitRef.current !== newLimit) {
        previousLimitRef.current = newLimit;
        fetchInstructors(newLimit);
      }
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.instructors}>
      <div className={styles.instructorsTop}>
        <InstructorsContent showBtn={false} isFlex={true} />
      </div>
      {loading ? (
        <div className={styles.instructorsLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load instructors: {error}
        </div>
      ) : (
        <div className={styles.instructorsBottom}>
          {instructors.map((instructor) => (
            <Instructor instructor={instructor} key={instructor?.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Instructors;
