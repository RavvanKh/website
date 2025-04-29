import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

export const links = {
  youtube: "https://www.youtube.com/@ingressacademy",
  facebook: "https://www.facebook.com/ingress.academy/",
  instagram: "https://www.instagram.com/ingress_academy/",
  linkedin: "https://www.linkedin.com/company/ingress_academy/",
  location: "https://www.google.com/maps?q=Ingress Academy",
  phone: "tel:+994775999940",
  email: "mailto:info@ingress",
};


export const contacts = [
  {
    key: "email",
    // icon: "/icons/email.svg",
    icon2:"/icons/email-2.svg",
    url: links.email,
    text: "info@ingress.az",
  },
  {
    key: "phone",
    icon:"/icons/phone.svg",
    icon2: "/icons/phone-2.svg",
    url: links.phone,
    text: "+994 77 599 99 40",
  },
  {
    key: "location",
    icon:"/icons/location.svg",
    icon2: "/icons/location-2.svg",
    url: links.location,
    text: "56A Bul-Bul ave. Nasimi r. Baku c.",
  },
];

export const contactSocials = [
  {
    key: "youtube",
    icon: FaYoutube,
    text: "YouTube",
    url: links.youtube,
  },
  {
    key: "facebook",
    icon: FaFacebook,
    text: "Facebook",
    url: links.facebook,
  },
  {
    key: "instagram",
    icon: FaInstagram,
    text: "Instagram",
    url: links.instagram,
  },
  {
    key: "linkedin",
    icon: FaLinkedin,
    text: "LinkedIn",
    url: links.linkedin,
  },
];
