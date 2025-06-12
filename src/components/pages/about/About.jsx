'use client'
import AboutUs from "@/components/ui/about/about-us/AboutUs";
import HistoryMission from "@/components/ui/about/history-mission/HistoryMission";
import Instructors from "@/components/ui/about/instructors/Instructors";
import Location from "@/components/ui/about/location/Location";
import { useGlobalData } from "@/contexts/GlobalDataContext";

const About = () => {
  const { data, loading, error } = useGlobalData();
  return (
    <section>
      <AboutUs />
      <HistoryMission />
      <Instructors  instructors={data.instructors} loading={loading.home} error={error.home}/>
      <Location />
    </section>
  );
};

export default About;
