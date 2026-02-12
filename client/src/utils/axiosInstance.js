import axios from "axios";

const axiosInstance = axios.create({
  baseURL: String(import.meta.env.VITE_SERVER_URL),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/refresh", {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("refreshToken") || ""
            }`,
          },
        });
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
