import CourseSlider from "@/components/shared/course-slider/CourseSlider";

import { COURSE_STYLES } from "@/lib/constants/course-styles";
import { COURSE_SLIDER_STYLES } from "@/lib/constants/course-slider-styles";

import styles from "./related-courses.module.css";

const RelatedCourses = ({ t, title, relatedCourses, loading, error }) => {
  return (
    <section className={styles.relatedCourses}>
      <h2 className={styles.relatedCoursesTitle}>{t(title)}</h2>
      <div className={styles.relatedCoursesList}>
        <CourseSlider
          loading={loading}
          error={error}
          courses={relatedCourses}
          courseStyle={COURSE_STYLES.ourCourses}
          sliderStyle={COURSE_SLIDER_STYLES.relatedCourses}
        />
      </div>
    </section>
  );
};

export default RelatedCourses;
