import { selectSections } from "@/lib/constants/selectSections";

import styles from "./select-section.module.css";

const SelectSection = ({ t, selectedSection, onClick }) => {
  return (
    <div className={styles.selectSection}>
      {selectSections.map((section, index) => (
        <div
          key={index}
          onClick={() => onClick(section.key)}
          className={`${styles.selectSectionItem} ${
            section.key === selectedSection ? styles.selectedSectionItem : ""
          }`}
        >
          {t(section.key)}
        </div>
      ))}
    </div>
  );
};

export default SelectSection;
