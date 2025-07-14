'use client'
import { useGlobalData } from "@/contexts/GlobalDataContext";
import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import("@/components/ui/about/about-us/AboutUs"), { ssr: false, loading: () => null });
const HistoryMission = dynamic(() => import("@/components/ui/about/history-mission/HistoryMission"), { ssr: false, loading: () => null });
const Instructors = dynamic(() => import("@/components/ui/about/instructors/Instructors"), { ssr: false, loading: () => null });
const Location = dynamic(() => import("@/components/ui/about/location/Location"), { ssr: false, loading: () => null });

import styles from "./about.module.css";

const About = () => {
  const { data, loading, error } = useGlobalData();
  return (
    <section className={styles.about}>
      <AboutUs />
      <HistoryMission />
      <Instructors instructors={data.instructors} loading={loading.home} error={error.home}/>
      <Location />
    </section>
  );
};

export default About;
