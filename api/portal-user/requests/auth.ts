import axiosInstance from "@/api/portal-user/request-adapter";

export const portalLogin = (data: any) => axiosInstance.post('/auth/login', data)

