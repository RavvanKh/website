import axios from "axios";

const API_DOMAIN =
  process.env.NEXT_PUBLIC_API_DOMAIN || "https://ingress.academy";

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
      "Accept-Language": "en",
      "Cache-Control": "no-store",
    },
  });
};

export const quizAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_QUIZ_MS_URL
);

  // quizAxios.interceptors.request.use(
  //   (config) => {
  //     config.headers["Accept-Language"] = "en";
  //     config.headers["Cache-Control"] = "no-store";
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

export const applicationAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_APPLICATION_MS_URL
);

// applicationAxios.interceptors.request.use(
//   (config) => {
//     config.headers["Accept-Language"] = "en";
//     config.headers["Cache-Control"] = "no-store";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const customAxios = createAxiosInstance(
  process.env.NEXT_PUBLIC_BASE_URL
);

// applicationAxios.interceptors.request.use(
//   (config) => {
//     config.headers["Accept-Language"] = "en";
//     config.headers["Cache-Control"] = "no-store";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
