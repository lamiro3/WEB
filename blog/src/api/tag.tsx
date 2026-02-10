import axios from "./axios"; // 반드시 직접 만든 axios를 import 해야 함

interface TagResponse {
    id: number;
    name: string;
}

export const newTag = async(id: number, name: string) : Promise<TagResponse> => {
    const response = await axios.post("/tags", {id, name});
    return response.data;
}