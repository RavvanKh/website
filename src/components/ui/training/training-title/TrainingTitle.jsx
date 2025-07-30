import Image from "next/image";

import ImgSkeleton from "@/components/shared/img-skeleton/ImgSkeleton";

import { convertWeekToHour } from "@/lib/utils/helpers";
import { convertWeekMonth } from "@/lib/utils/helpers/convertWeekToMonth";

import styles from "./training-title.module.css";

const TrainingTitle = ({ training, t }) => {
  return (
    <section className={styles.trainingTitle}>
      <div className={styles.trainingTitleContainer}>
        <div className={styles.trainingTitleLeft}>
          <h1>{training.name}</h1>
          <p>{training.description}</p>
          <div className={styles.trainingDurationBox}>
          <div className={styles.trainingType}>

          </div>
            <div className={styles.trainingDuration}>
              <Image
                src="/icons/duration.svg"
                height={18}
                width={18}
                alt="Duration icon"
                loading="lazy"
              />
              <div className={styles.durationInfoWrapper}>
                <span>
                  {convertWeekMonth(training?.durationInWeeks)} {t("months")}
                </span>
                <span>
                  {training?.durationInWeeks} {t("weeks")}
                </span>
                <span>
                  {convertWeekToHour(
                    training?.durationInWeeks,
                    training?.hoursPerSession,
                    training?.sessionsPerWeek
                  )}{" "}
                  {t("hours")}
                </span>
                <span>
                  {training?.hoursPerSession} {t("hours")}/{t("lesson")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.trainingTitleRight}>
          <ImgSkeleton
            obj={training}
            keyName="icon"
            isRounded={false}
            borderRadius="8px"
          />
        </div>
      </div>
    </section>
  );
};

export default TrainingTitle;
