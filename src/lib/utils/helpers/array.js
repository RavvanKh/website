import { contactSocials } from "@/data/contact";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const getRandomItems = (arr, count) => {
  if (!Array.isArray(arr)) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const renderStars = (rating, className, width = 20, height = 31) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar
          key={i}
          className={className}
          size={width}
          height={height}
          width={width}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className={className}
          height={height}
          size={width}
          width={width}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className={className}
          height={height}
          size={width}
          width={width}
        />
      );
    }
  }
  return stars;
};

export const getContactInfo = (hidden = "") => {
  return contactSocials.filter((item) => item.key !== hidden);
};
