import axios from "axios";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

const getMsUrl = (servicePath) => {
  const baseDomain = API_DOMAIN.endsWith("/")
    ? API_DOMAIN.slice(0, -1)
    : API_DOMAIN;
  const path = servicePath.startsWith("/") ? servicePath : `/${servicePath}`;

  return `${baseDomain}${path}`;
};

const createAxiosInstance = (servicePath) => {
  const baseURL = getMsUrl(servicePath);

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};

export const quizAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_QUIZ_MS_URL
);

export const customAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_BASE_URL
);


export const userAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_USERS_MS_URL

)
