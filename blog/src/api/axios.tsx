import axios from "axios";

// 인스턴스 생성
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json", // 모든 형식이 JSON 형식임을 명시
    },
});

console.log("Current API URL:", process.env.REACT_APP_API_URL);

// 요청 인터셉터 설정
instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// 현재 토큰 새로고침 여부
let isRefresh = false;
// 토큰이 만료되었을 때, 새 토큰이 나올 때까지 잠시 대기시키는 요청들의 리스트
let failedQueue: any[] = [];

// 에러 발생했다면 거부, 아니면 토큰 재발급
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error)
            p.reject(error); // 말 그대로 작업 실패
        else
            p.resolve(token); // 재발급 성공 시 대기 중 요청들 한번에 실행
    })
}

// 응답 인터셉터 설정
instance.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config; // 에러 발생한 친구
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefresh) { // 이미 다른 요청이 토큰을 갱신 중일 때 현재 요청은 failedQueue에 넣고 대기
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
                const result = await instance.post("/auth/refresh", {refreshToken});

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