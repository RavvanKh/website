import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export const contact = [
  {
    key: "location",
    icon: "/icons/location.svg",
    text: "56A Bul-Bul ave. Nasimi r. Baku c.",
  },
  { key: "phone", icon: "/icons/phone.svg", text: "+994 77 599 99 40" },
];

export const contactForCourseApplication = [
  {
    key: "email",
    icon: "/icons/email-2.svg",
    url: "mailto:info@ingress.az",
    text: "info@ingress.az",
  },
  {
    key: "phone",
    icon: "/icons/phone-2.svg",
    url: "tel:+994 77 599 99 40",
    text: "+994 77 599 99 40",
  },
  {
    key: "location",
    icon: "/icons/location-2.svg",
    url: "https://www.google.com/maps?q=Ingress Academy",
    text: "56A Bul-Bul ave. Nasimi r. Baku c.",
  },
];

export const contactSocials = [
  {
    key: "facebook",
    icon: FaFacebook,
    text: "Facebook",
    link: "https://www.facebook.com/ingress.academy/",
  },
  {
    key: "instagram",
    icon: FaInstagram,
    text: "Instagram",
    link: "https://www.instagram.com/ingress_academy/",
  },
  {
    key: "linkedin",
    icon: FaLinkedin,
    text: "LinkedIn",
    link: "https://www.linkedin.com/company/ingress_academy/",
  },
];
