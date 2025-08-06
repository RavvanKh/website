"use client";
import { useMemo } from "react";

import { useI18n } from "@/locales/client";

import Event from "./event/Event";

import styles from "./events.module.css";

const Events = ({ loading, error }) => {
  const events = [
    // {
    //   image:
    //     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    //   title: "Tech Konfransı 2025",
    //   description:
    //     "Yerli və beynəlxalq texnoloji şirkətlərin qatıldığı illik konfrans.",
    //   time: "2025-09-15T10:00:00",
    //   place: "Bakı Konqres Mərkəzi",
    // },
    // {
    //   image:
    //     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    //   title: "Frontend Dev MeetUp",
    //   description: "Frontend texnologiyaları və təcrübələrin paylaşılması.",
    //   time: "2025-11-05T18:00:00",
    //   place: "Code Academy, Bakı",
    // },
    // {
    //   image:
    //     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    //   title: "Hackathon 48H",
    //   description:
    //     "Komandalar 48 saat ərzində innovativ layihələr hazırlayacaq.",
    //   time: "2025-12-12T20:00:00",
    //   place: "İnformasiya Texnologiyaları Parkı",
    // },
  ];

  const t = useI18n();

  if (events?.length === 0) return null;
  return (
    <section className={styles.events}>
      <div className={styles.eventsTitle}>{t("events")}</div>
      <div className={styles.eventsList}>
        {events.map((event, index) => (
          <Event key={index} t={t} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Events;
