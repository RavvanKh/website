import Course from "@/components/shared/course/Course";
import styles from "./related-courses.module.css";

const RelatedCourses = ({ t, title, relatedCourses }) => {
  return (
    <section className={styles.relatedCourses}>
      <div className={styles.relatedCoursesTitle}>{t(title)}</div>
      <div className={styles.relatedCoursesList}>
        {relatedCourses.map((course) => (
          <Course
            key={course.id}
            imgHeight="200px"
            imgWidth="100%"
            duration={true}
            lines={4}
            levelPosition="top"
            direction="column"
            course={course}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedCourses;
