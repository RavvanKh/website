export const extractDigits = (phone) => {
  return phone ? phone.replace(/[^\d+]/g, '') : '';
};
