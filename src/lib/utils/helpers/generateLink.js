export const generateLink = (type, value) => {
  switch (type) {
    case "email":
      return `mailto:${value}`;
    case "location":
      return `https://www.google.com/maps?q=${value}`;
    case "phone":
      return `tel:${value}`;
    default:
      return "";
  }
};
