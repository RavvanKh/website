import { RiLoader2Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

import styles from "./next-group.module.css";

const NextGroup = ({
  isDownloadingSyllabus = false,
  t,
  onClickApply,
  onClickSyllabus,
}) => {
  return (
    <div className={styles.nextGroup}>
      <div className={styles.nextGroupTop}>
        <div>{t("nextGroup")}:</div>
        <p>16 may, 2025</p>
      </div>
      <div className={styles.nextGroupContent}>{t("nextGroupContent")}</div>
      <div className={styles.nextGroupBtnGroup}>
        <button
          className={styles.nextGroupSyllabus}
          onClick={() => onClickSyllabus("nextGroup")}
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
              {t("syllabus")}
            </>
          )}
        </button>

        <button className={styles.nextGroupApply} onClick={onClickApply}>
          {t("apply")}
        </button>
      </div>
    </div>
  );
};

export default NextGroup;
