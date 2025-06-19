"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useI18n } from "@/locales/client";

import { createCourseApplication } from "@/lib/utils/api/courseApplication";

import styles from "./course-application-form.module.css";


const CourseApplicationForm = ({ courses = [], course = {} }) => {
  const t = useI18n();

  const hasCourse = !!course?.name;

  const schema = yup.object().shape({
    courseId: yup.string().required("Course is required"),
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    // message: yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const selectedCourse =
      courses.find((c) => c.id === data.courseId) || course;
    const payload = {
      ...data,
      courseName: selectedCourse?.name || "",
    };

    try {
      await createCourseApplication(payload);
    } catch (err) {
      throw new Error(err?.message);
    }
  };

  useEffect(() => {
    setValue("courseId", course?.id);
  }, [course?.name]);

  return (
    <div
      className={`${styles.courseApplicationRight} ${
        course?.name ? styles.courseApplicationRightWithCourse : ""
      }`}
    >
      <div className={styles.courseApplicationRightTitle}>
        {t("courseApplication")}
      </div>
      <div className={styles.courseApplicationRightDescription}>
        {t("courseApplicationRightDescription")}
      </div>
      <form
        className={styles.courseApplicationForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!hasCourse && (
          <div className={styles.courseApplicationFormInputGroup}>
            <label htmlFor="course">{t("course")}</label>
            <select
              {...register("courseId", { required: !hasCourse })}
              defaultValue=""
              id="courseId"
              name="courseId"
            >
              <option value=""  label={t("selectCourse")} disabled>
                {t("selectCourse")}
              </option>
              {courses?.map((course) => (
                <option key={course.id} label={course.name} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className={styles.error}>{errors.courseId.message}</p>
            )}
          </div>
        )}

        {!hasCourse && (
          <div className={styles.courseApplicationFormInputGroup}>
            <label htmlFor="fullName">{t("fullName")}</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              {...register("fullName")}
              placeholder={t("enterFullName")}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>
        )}

        <div className={styles.courseApplicationFormFlex}>
          {hasCourse && (
            <div className={styles.courseApplicationFormInputGroup}>
              <label htmlFor="fullName">{t("fullName")}</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                {...register("fullName")}
                placeholder={t("enterFullName")}
              />
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName.message}</p>
              )}
            </div>
          )}
          <div className={styles.courseApplicationFormInputGroup}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.courseApplicationFormInputGroup}>
            <label htmlFor="phoneNumber">{t("phoneNumber")}</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              {...register("phone")}
              placeholder="+99450000 00 00"
            />
            {errors.phoneNumber && (
              <p className={styles.error}>{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        {/* <div className={styles.courseApplicationFormInputGroup}>
          <label htmlFor="message">{t("message")}</label>
          <textarea
            name="message"
            id="message"
            {...register("message")}
            placeholder={t("writeYourMessage")}
          />
          {errors.message && (
            <p className={styles.error}>{errors.message.message}</p>
          )}
        </div> */}

        <div className={styles.courseApplicationFormSubmitBtn}>
          <button type="submit">{t("submit")}</button>
        </div>
      </form>
    </div>
  );
};

export default CourseApplicationForm;
