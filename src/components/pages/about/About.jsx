"use client";
import { useGlobalData } from "@/contexts/GlobalDataContext";
import dynamic from "next/dynamic";

import GlobalDataWrapper from "@/components/shared/global-data-wrapper/GlobalDataWrapper";

const AboutUs = dynamic(
  () => import("@/components/ui/about/about-us/AboutUs"),
  { ssr: false, loading: () => null }
);
const HistoryMission = dynamic(
  () => import("@/components/ui/about/history-mission/HistoryMission"),
  { ssr: false, loading: () => null }
);
const Instructors = dynamic(
  () => import("@/components/ui/about/instructors/Instructors"),
  { ssr: false, loading: () => null }
);
const Location = dynamic(
  () => import("@/components/ui/about/location/Location"),
  { ssr: false, loading: () => null }
);

import styles from "./about.module.css";

const About = () => {
  const { data, loading, error } = useGlobalData();

  return (
    <GlobalDataWrapper loading={loading.home} error={error.home}>
      <section className={styles.about}>
        <AboutUs
          error={error.home}
          loading={loading.home}
          reasons={data?.reasons}
        />
        <HistoryMission
          reasons={data?.reasons}
          loading={loading.home}
          error={error.home}
        />
        <Instructors
          instructors={data.instructors}
          loading={loading.home}
          error={error.home}
        />
        <Location />
      </section>
    </GlobalDataWrapper>
  );
};

export default About;
