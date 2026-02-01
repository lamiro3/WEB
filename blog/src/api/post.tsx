import axios from "axios";

// 모든 API 호출 담당
export const getPosts = () => {
    return axios.get('/posts');
};