"use client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import styles from "./generate-pdf.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import Advantages from "../advantages/Advantages";
import { useI18n } from "@/locales/client";
import { useTraining } from "@/contexts/TrainingContext";

export default function GeneratePdf() {
  const { training } = useTraining();

  const t = useI18n();
  const pdfRef = useRef();

  const getFirstThreeSentences = (text = "") => {
    return text
      .split(/(?<=[.?!])\s+/)
      .slice(0, 3)
      .join(" ");
  };

  const handleGenerate = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageElements = pdfRef.current.querySelectorAll(
      `.${styles.coverPage}, .${styles.blankPage}`
    );

    for (let i = 0; i < pageElements.length; i++) {
      const pageEl = pageElements[i];
      const canvas = await html2canvas(pageEl, {
        scale: 3,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      if (i !== 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    }

    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    // window.open(url);
  };

  return (
    <>
      <div ref={pdfRef} className={styles.pdf}>
        <div className={styles.coverPage}>
          <img
            src="/images/pdf-cover.jpg"
            alt="cover"
            width="595"
            height="842"
            className={styles.bg}
          />
          <h1 className={styles.trainingTitle}>{training?.name}</h1>
          <p className={styles.trainingDescription}>
            {getFirstThreeSentences(training?.description)}
          </p>
        </div>

        <div className={styles.blankPage}>
          <img
            src="/images/pdf-bg.jpg"
            alt="blank"
            height="842"
            width="595"
            className={styles.bg}
          />
          <div className={styles.trainingAdvantages}>
            <Advantages
              advantages={training?.advantages}
              t={t}
              title={"advantages"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
