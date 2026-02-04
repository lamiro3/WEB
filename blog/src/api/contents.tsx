import axios from "./axios";

interface Tag {
    tag_id: number;
    name: string;
}

interface ContentResponse {
  content_id: number,
  title: string,
  post: string,
  summary: string,
  createdAt: string,
  tags: string[];
}

export const newContent = async(
    content_id:number, 
    title: string, 
    post: string, 
    summary: string, 
    createdAt: string, 
    tags: Tag[]) : Promise<ContentResponse> => {
        const response = await axios.post("/contents", {
            content_id,
            title,
            post,
            summary,
            createdAt,
            tags
        });
        
        return response.data;
};