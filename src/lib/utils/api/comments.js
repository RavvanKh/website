import { quizAxios } from "@/lib/axios";

export const getComments = async () => {
  try {
    const res = await quizAxios.get('/api/google/reviews');
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
