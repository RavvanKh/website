"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { FaLink } from "react-icons/fa";

import { toast } from "react-toastify";

import { useI18n } from "@/locales/client";

import { routes } from "@/lib/constants/routes";

import { verifyRecaptcha } from "@/lib/utils/api/reCaptcha";
import { createCourseApplication } from "@/lib/utils/api/courseApplication";

import SuccessModal from "../success-modal/SuccessModal";

import { englishLevels } from "@/lib/constants/englishLevels";
import { knowledgeLevels } from "@/lib/constants/knowledgeLevel";
import { paymentTypes } from "@/lib/constants/paymentTypes";
import { hearAboutOptions } from "@/lib/constants/hearAboutOptions";
import { lessonTypes } from "@/lib/constants/lessonTypes";

import styles from "./course-application-form.module.css";

const CourseApplicationForm = ({
  courses = [],
  courseId = "",
  formContinue = false,
  params = {},
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const t = useI18n();
  const recaptchaRef = useRef(null);

  const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

  const router = useRouter();

  const hasCourse = !!courseId;

  const phoneRegex = /^\+\d{6,15}$/;

  const schema = yup.object().shape({
    trainingId: yup.string().required(t("trainingIsRequired")),
    firstName: yup
      .string()
      .required(t("firstNameIsRequired"))
      .min(2, t("firstNameMin")),
    lastName: yup
      .string()
      .required(t("lastNameIsRequired"))
      .min(2, t("lastNameMin")),
    emailAddress: yup
      .string()
      .email(t("invalidEmail"))
      .required(t("emailIsRequired")),
    phoneNumber: yup
      .string()
      .required(t("phoneNumberIsRequired"))
      .matches(phoneRegex, t("invalidPhoneNumber")),
    educationalInstitution: yup
      .string()
      .required(t("educationalInstitutionIsRequired")),
    currentWorkPlace: yup.string().required(t("currentWorkplaceIsRequired")),
    learningPreference: yup
      .string()
      .required(t("learningPreferenceIsRequired")),
    technicalKnowledgeLevel: yup
      .string()
      .required(t("technicalKnowledgeLevelIsRequired")),
    englishProficiencyLevel: yup
      .string()
      .required(t("englishProficiencyLevelIsRequired")),
    paymentResponsibility: yup
      .string()
      .required(t("paymentResponsibilityIsRequired")),
    referralSource: yup.string().required(t("referralSourceIsRequired")),
    previouslyParticipatedTrainings: yup.array().of(yup.string()),
    additionalMessage: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues:{
    //   trainingId:"java-se-oca",
    //   firstName:"Ravan",
    //   lastName:"Khaligov",
    //   additionalMessage:"test message",
    //   currentWorkPlace:"Ingress Academy",
    //   educationalInstitution:"AzTU",
    //   emailAddress:"revanxaliqov01@gmail.com",
    //   englishProficiencyLevel:"A2",
    //   learningPreference:"ONLINE",
    //   paymentResponsibility:"BY_COMPANY",
    //   previouslyParticipatedTrainings:[],
    //   referralSource:"LINKEDIN",
    //   technicalKnowledgeLevel:"BEGINNER"
    // }
  });

  const watchedFields = watch();

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      trainingId: data.trainingId || courseId,
      learningPreference: data.learningPreference,
      technicalKnowledgeLevel: data.technicalKnowledgeLevel,
      englishProficiencyLevel: data.englishProficiencyLevel,
      paymentResponsibility: data.paymentResponsibility,
      referralSource: data.referralSource,
      educationalInstitution: data.educationalInstitution,
      currentWorkPlace: data.currentWorkPlace,
      previouslyParticipatedTrainings:
        data.previouslyParticipatedTrainings || [],
      additionalMessage: data.additionalMessage || "",
    };

    try {
      await createCourseApplication(payload);
      setShowSuccessModal(true);
      reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleVerifyRecaptcha = async (token) => {
    try {
      const res = await verifyRecaptcha({
        secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
        token,
      });
    } catch (err) {
      throw new Error(err?.message);
    }
  };

  const handleRouteApplication = () => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(watchedFields)) {
      if (value && value.trim() !== "") {
        params.append(key, value);
      }
    }

    router.push(`${routes.trainingApplication}?${params.toString()}`);
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(t("clipboardSuccess"));
      })
      .catch((err) => {
        toast.error(t("clipboardError"));
      });
  };

  useEffect(() => {
    if (courseId) {
      setValue("trainingId", courseId);
    }
  }, [courseId, setValue]);

  useEffect(() => {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        setValue(key, value);
      }
    });
  }, [setValue]);

  if (showSuccessModal) {
    return (
      <SuccessModal
        isOpen={true}
        title="successfullySent"
        onClose={() => setShowSuccessModal(false)}
        message={"trainingApplicationSuccess"}
      />
    );
  }

  return (
    <div className={styles.courseApplicationContainer}>
      <div className={styles.courseApplicationHeader}>
        <div className={styles.courseApplicationSubHeader}>
          <h2 className={styles.courseApplicationTitle}>
            {t("trainingApplication")}
          </h2>
          {!formContinue && (
            <FaLink
              size={20}
              className={styles.courseApplicationCopyUrl}
              title={t("copy")}
              onClick={handleCopyUrl}
            />
          )}
        </div>
        <p className={styles.courseApplicationDescription}>
          {t("trainingApplicationRightDescription")}
        </p>
      </div>

      <form
        className={styles.courseApplicationForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* {!formContinue && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <ReCAPTCHA
                sitekey={SITE_KEY}
                ref={recaptchaRef}
                onChange={handleVerifyRecaptcha}
              />
            </div>
          </div>
        )} */}
        <div className={styles.formSection}>
          <div
            className={`${styles.inputRow} ${
              formContinue ? styles.continueRow : styles.single
            }`}
          >
            {!hasCourse && (
              <div className={styles.inputGroup}>
                <label htmlFor="trainingId" className={styles.label}>
                  <span className={styles.labelText}>{t("training")}</span>
                  {!formContinue && <span className={styles.required}>*</span>}
                </label>
                <select
                  {...register("trainingId")}
                  id="trainingId"
                  className={`${styles.select} ${
                    errors.trainingId ? styles.error : ""
                  }`}
                >
                  <option value="">{t("selectTraining")}</option>
                  {courses?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                {errors.trainingId && (
                  <span className={styles.errorMessage}>
                    {errors.trainingId.message}
                  </span>
                )}
              </div>
            )}

            {formContinue && (
              <div className={styles.inputGroupContinue}>
                <button
                  type="button"
                  onClick={handleRouteApplication}
                  className={styles.continue}
                >
                  {t("continue")}
                </button>
              </div>
            )}
          </div>
        </div>

        {!formContinue && (
          <>
            {/* Personal Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                {t("personalInformation")}
              </h3>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    <span className={styles.labelText}>{t("firstName")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className={`${styles.input} ${
                      errors.firstName ? styles.error : ""
                    }`}
                    placeholder={t("enterFirstName")}
                  />
                  {errors.firstName && (
                    <span className={styles.errorMessage}>
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lastName" className={styles.label}>
                    <span className={styles.labelText}>{t("lastName")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className={`${styles.input} ${
                      errors.lastName ? styles.error : ""
                    }`}
                    placeholder={t("enterLastName")}
                  />
                  {errors.lastName && (
                    <span className={styles.errorMessage}>
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="emailAddress" className={styles.label}>
                    <span className={styles.labelText}>{t("email")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    {...register("emailAddress")}
                    className={`${styles.input} ${
                      errors.emailAddress ? styles.error : ""
                    }`}
                    placeholder="example@gmail.com"
                  />
                  {errors.emailAddress && (
                    <span className={styles.errorMessage}>
                      {errors.emailAddress.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>
                    <span className={styles.labelText}>{t("phoneNumber")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    className={`${styles.input} ${
                      errors.phoneNumber ? styles.error : ""
                    }`}
                    placeholder="+994501234567"
                  />
                  {errors.phoneNumber && (
                    <span className={styles.errorMessage}>
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="educationalInstitution"
                    className={styles.label}
                  >
                    <span className={styles.labelText}>{t("education")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="educationalInstitution"
                    {...register("educationalInstitution")}
                    className={`${styles.input} ${
                      errors.educationalInstitution ? styles.error : ""
                    }`}
                    placeholder={t("universityOrEducation")}
                  />
                  {errors.educationalInstitution && (
                    <span className={styles.errorMessage}>
                      {errors.educationalInstitution.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="currentWorkPlace" className={styles.label}>
                    <span className={styles.labelText}>{t("workplace")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="currentWorkPlace"
                    {...register("currentWorkPlace")}
                    className={`${styles.input} ${
                      errors.currentWorkPlace ? styles.error : ""
                    }`}
                    placeholder={t("currentWorkplace")}
                  />
                  {errors.currentWorkPlace && (
                    <span className={styles.errorMessage}>
                      {errors.currentWorkPlace.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Training Preferences Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                {t("trainingPreferences")}
              </h3>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="learningPreference" className={styles.label}>
                    <span className={styles.labelText}>
                      {t("learningPreference")}
                    </span>
                    <span className={styles.required}>*</span>
                  </label>
                  <select
                    {...register("learningPreference")}
                    id="learningPreference"
                    className={`${styles.select} ${
                      errors.learningPreference ? styles.error : ""
                    }`}
                  >
                    <option value="">{t("selectLearningPreference")}</option>
                    {lessonTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {t(type.label)}
                      </option>
                    ))}
                  </select>
                  {errors.learningPreference && (
                    <span className={styles.errorMessage}>
                      {errors.learningPreference.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label
                    htmlFor="technicalKnowledgeLevel"
                    className={styles.label}
                  >
                    <span className={styles.labelText}>
                      {t("technicalKnowledgeLevel")}
                    </span>
                    <span className={styles.required}>*</span>
                  </label>
                  <select
                    {...register("technicalKnowledgeLevel")}
                    id="technicalKnowledgeLevel"
                    className={`${styles.select} ${
                      errors.technicalKnowledgeLevel ? styles.error : ""
                    }`}
                  >
                    <option value="">
                      {t("selectTechnicalKnowledgeLevel")}
                    </option>
                    {knowledgeLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {t(level.label)}
                      </option>
                    ))}
                  </select>
                  {errors.technicalKnowledgeLevel && (
                    <span className={styles.errorMessage}>
                      {errors.technicalKnowledgeLevel.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="englishProficiencyLevel"
                    className={styles.label}
                  >
                    <span className={styles.labelText}>
                      {t("englishProficiencyLevel")}
                    </span>
                    <span className={styles.required}>*</span>
                  </label>
                  <select
                    {...register("englishProficiencyLevel")}
                    id="englishProficiencyLevel"
                    className={`${styles.select} ${
                      errors.englishProficiencyLevel ? styles.error : ""
                    }`}
                  >
                    <option value="">
                      {t("selectEnglishProficiencyLevel")}
                    </option>
                    {englishLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {t(level.label)}
                      </option>
                    ))}
                  </select>
                  {errors.englishProficiencyLevel && (
                    <span className={styles.errorMessage}>
                      {errors.englishProficiencyLevel.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label
                    htmlFor="paymentResponsibility"
                    className={styles.label}
                  >
                    <span className={styles.labelText}>
                      {t("paymentResponsibility")}
                    </span>
                    <span className={styles.required}>*</span>
                  </label>
                  <select
                    {...register("paymentResponsibility")}
                    id="paymentResponsibility"
                    className={`${styles.select} ${
                      errors.paymentResponsibility ? styles.error : ""
                    }`}
                  >
                    <option value="">{t("selectPaymentResponsibility")}</option>
                    {paymentTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {t(type.label)}
                      </option>
                    ))}
                  </select>
                  {errors.paymentResponsibility && (
                    <span className={styles.errorMessage}>
                      {errors.paymentResponsibility.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                {t("additionalInformation")}
              </h3>

              <div className={`${styles.inputRow} ${styles.single}`}>
                <div className={styles.inputGroup}>
                  <label htmlFor="referralSource" className={styles.label}>
                    <span className={styles.labelText}>{t("hearAboutUs")}</span>
                    <span className={styles.required}>*</span>
                  </label>
                  <select
                    {...register("referralSource")}
                    id="referralSource"
                    className={`${styles.select} ${
                      errors.referralSource ? styles.error : ""
                    }`}
                  >
                    <option value="">{t("selectSource")}</option>
                    {hearAboutOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.label)}
                      </option>
                    ))}
                  </select>
                  {errors.referralSource && (
                    <span className={styles.errorMessage}>
                      {errors.referralSource.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={`${styles.inputRow} ${styles.single}`}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="previouslyParticipatedTrainings"
                    className={styles.label}
                  >
                    <span className={styles.labelText}>
                      {t("previousTrainings")}
                    </span>
                  </label>
                  <select
                    multiple={true}
                    {...register("previouslyParticipatedTrainings")}
                    id="previouslyParticipatedTrainings"
                    className={`${styles.select} ${
                      errors.previouslyParticipatedTrainings ? styles.error : ""
                    }`}
                  >
                    <option value="">{t("selectPreviousTrainings")}</option>
                    {courses?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  {errors.previouslyParticipatedTrainings && (
                    <span className={styles.errorMessage}>
                      {errors.previouslyParticipatedTrainings.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={`${styles.inputRow} ${styles.single}`}>
                <div className={styles.inputGroup}>
                  <label htmlFor="additionalMessage" className={styles.label}>
                    <span className={styles.labelText}>
                      {t("additionalMessage")}
                    </span>
                  </label>
                  <textarea
                    maxLength={600}
                    id="additionalMessage"
                    {...register("additionalMessage")}
                    className={styles.textarea}
                    placeholder={t("writeYourMessage")}
                    rows={4}
                  />
                  {errors.additionalMessage && (
                    <span className={styles.errorMessage}>
                      {errors.additionalMessage.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.submitSection}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${
                  isSubmitting ? styles.loading : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    {t("submitting")}
                  </>
                ) : (
                  t("submitApplication")
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CourseApplicationForm;
