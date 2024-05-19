import axiosInstance from "@/api/portal-user/request-adapter";

export const portalLogin = (data: any) => axiosInstance.post('/auth/login', data)
export const portalCreateAccount = (data: any) => axiosInstance.post('/auth/create-account', data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const portalLogOut = (data: { refreshToken: string }) => axiosInstance.post('/auth/logout', data)

