'use client'
import { useEffect, useState } from "react";
import NextImage from "next/image";
import { format } from "date-fns";
import { az } from "date-fns/locale";

import ImgSkeleton from "../../img-skeleton/ImgSkeleton";

import styles from "./event.module.css";

const Event = ({ event, t }) => {
  const [textColor, setTextColor] = useState("#fff");
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formattedDate = format(new Date(event.startDateTime), "d MMMM, yyyy", {
    locale: az,
  }).toLowerCase();


  const calculateRegionColor = (canvas, ctx, img) => {
    const regionHeight = Math.floor(img.height * 0.3);
    const regionWidth = Math.floor(img.width * 0.5); 
    const startY = img.height - regionHeight;
    const startX = 0;
    
    try {
      const imageData = ctx.getImageData(startX, startY, regionWidth, regionHeight);
      const { data } = imageData;
      
      let r = 0, g = 0, b = 0, pixelCount = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          pixelCount++;
        }
      }
      
      if (pixelCount === 0) return "#fff";
      
      const avgR = r / pixelCount;
      const avgG = g / pixelCount;
      const avgB = b / pixelCount;
      
      const brightness = (avgR * 0.299 + avgG * 0.587 + avgB * 0.114);
      
      return brightness > 140 ? "#000" : "#fff";
    } catch (error) {
      console.warn("Renk hesaplama hatası:", error);
      return "#fff";
    }
  };

  useEffect(() => {
    if (!event.promotionalImageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; 
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        const calculatedColor = calculateRegionColor(canvas, ctx, img);
        setTextColor(calculatedColor);
        setImageLoaded(true);
        
        canvas.remove();
      } catch (error) {
        console.warn("Resim işleme hatası:", error);
        setTextColor("#fff");
        setImageLoaded(true);
      }
    };
    
    img.onerror = () => {
      console.warn("Resim yüklenemedi");
      setTextColor("#fff");
      setImageLoaded(true);
    };
    
    img.src = event.promotionalImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [event.promotionalImageUrl]);

  return (
    <div className={styles.event}>
      <div className={styles.eventImage}>
        <ImgSkeleton
          obj={event}
          keyName={"promotionalImageUrl"}
          defaultClass="event"
        />
        <div className={styles.eventSpeakers}>
          {event?.speakersDto?.slice(0, 6)?.map((speaker, index) => (
            <div
              className={styles.eventSpeaker}
              key={index}
              style={{ bottom: `${index * 25 + 5}px` }}
            >
              <ImgSkeleton
                keyName="photoUrl"
                obj={speaker}
                defaultClass="speaker"
              />
              <span 
                style={{
                  color: textColor,
                  textShadow: textColor === "#fff" 
                    ? "1px 1px 2px rgba(0,0,0,0.8)" 
                    : "1px 1px 2px rgba(255,255,255,0.8)",
                  transition: "color 0.3s ease"
                }}
              >
                {speaker?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.eventContent}>
        <article className={styles.eventInfo}>
          <div className={styles.eventInfoTop}>
            <div className={styles.eventIcon}>
              <NextImage
                src={"/icons/event.svg"}
                alt="event"
                width={16}
                height={16}
              />
              <span>{t("event")}</span>
            </div>
          </div>
          <div className={styles.eventTitle}>{event?.title}</div>
          <div className={styles.eventDescription}>{event?.description}</div>
        </article>
        <div className={styles.eventDetail}>
          <div className={styles.eventDetailItem}>
            <NextImage
              src={"/icons/calendar.svg"}
              height={16}
              width={16}
              alt="Calendar"
            />
            <p>{formattedDate}</p>
          </div>
          <div className={styles.eventDetailItem}>
            <NextImage
              src={"/icons/location-dark.svg"}
              height={16}
              width={16}
              alt="Location"
            />
            <p>{event?.locationDto?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;