import axios from "axios";

// 인스턴스 생성
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 설정
instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// 새로고침 여부
let isRefresh = false;
// auth 실패 후 대기 중인 요청들
let failedQueue: any[] = [];

// 에러 발생했다면 거부, 아니면 토큰 재발급
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error)
            p.reject(error);
        else
            p.resolve(token);
    })
}

// 응답 인터셉터 설정
instance.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config; // 에러 발생한 친구
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefresh) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                });
            }
            
            originalRequest._retry = true;
            isRefresh = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const result = await axios.post("https://localhost:3000/auth/refresh", {refreshToken});

                const newAccessToken = result.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization =`Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (error) {
                processQueue(error, null);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            } finally {
                isRefresh = false;
            }
        }

        return Promise.reject(error);
    })

export default instance;