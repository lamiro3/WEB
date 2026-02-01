import axios from "./axios";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const login = async(username: string, password: string) : Promise<LoginResponse> => {
    const response = await axios.post("/login", { username, password });
    return response.data;
}