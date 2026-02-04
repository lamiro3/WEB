import axios from "./axios"; // 반드시 직접 만든 axios를 import 해야 함

interface TagResponse {
    tag_id: number;
    name: string;
}

export const newTag = async(tag_id: number, name: string) : Promise<TagResponse> => {
    const response = await axios.post("/tags", {tag_id, name});
    return response.data;
}