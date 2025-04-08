import { quizAxios } from "../../axios"


export const getCourses = async (number = 0 ,size = 100) =>{
    try{
        const res = await quizAxios.get(`/courses/search?number=${number}&size=${size}`);
        return res.data
    }catch(err){
        console.error(err?.message)
    }

}