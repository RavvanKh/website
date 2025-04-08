import axios from "axios";



const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL:`${baseURL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const quizAxios = createAxiosInstance(process.env.NEXT_PUBLIC_QUIZ_MS_URL);

quizAxios.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

