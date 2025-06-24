import { RiLoader2Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

import { convertStringToDate } from "@/lib/utils/helpers";

import styles from "./next-group.module.css";

const NextGroup = ({
  isDownloadingSyllabus = false,
  t,
  onClickApply,
  onClickSyllabus,
  nextGroup,
}) => {
  const formatted = convertStringToDate(nextGroup?.startDate);

  return (
    <div className={styles.nextGroup}>
      {nextGroup?.startDate && (
        <div className={styles.nextGroupTop}>
          <div>{t("upcomingGroup")}:</div>
          <p>{formatted}</p>
        </div>
      )}
      <div className={styles.nextGroupContent}>{t("upcomingGroupContent")}</div>
      <div className={styles.nextGroupBtnGroup}>
        <a
          href="https://docs.google.com/document/d/1iYXlsn6vAnt2CXHzV1Gsjg6RiOdLVRec3z_dwcmLVjk/edit?usp=sharing"
          target="_blank"
        >
          <button
            className={styles.nextGroupSyllabus}
            // onClick={() => onClickSyllabus("upcomingGroupContent")}
            disabled={isDownloadingSyllabus}
          >
            {isDownloadingSyllabus ? (
              <RiLoader2Fill size={20} className={styles.loaderIcon} />
            ) : (
              <>
                <MdOutlineFileDownload
                  size={20}
                  style={{ marginRight: 5 }}
                  height={20}
                  width={20}
                />
                {t("trainingProgram")}
              </>
            )}
          </button>
        </a>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc5RF6OP5SmUqhaCYl3gBbctvJPR7v7HqYFu2IyZPv8bc35eQ/viewform"
          target="_blank"
        >
          <button className={styles.nextGroupApply} onClick={onClickApply}>
            {t("apply")}
          </button>
        </a>
      </div>
    </div>
  );
};

export default NextGroup;
