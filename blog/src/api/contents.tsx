import axios from "./axios";

interface Tag {
    id: number;
    name: string;
}

interface Image {
    file:File;
    preview:string;
}

interface ContentResponse {
  content_id: number,
  title: string,
  post: string,
  summary: string,
  createdAt: string,
  tags: string[];
  images: Image[];
}

export const newContent = async(
    id:number, 
    title: string, 
    post: string, 
    summary: string, 
    createdAt: string, 
    tags: Tag[],
    images: Image[]) : Promise<ContentResponse> => {
        // FormData Obj가 아니라면 브라우저는 내부의 File Obj들을 제대로 패키징 못함!
        // file or string 만 전달할 수 있음
        const formData = new FormData();

        formData.append("id", id.toString());
        formData.append("title", title);
        formData.append("post", post);
        formData.append("summary", summary);
        formData.append("createdAt", createdAt);
        formData.append("tags", JSON.stringify(tags));
        
        images.forEach((imgObj) => {
            formData.append("images", imgObj.file);
        })

        const response = await axios.post("/contents", formData, { 
            headers: {
            "Content-Type": "multipart/form-data" // HTTP 통신에선 파일 전송 시 해당 타입으로 전송해야 함!
        }});
        
        return response.data;
};