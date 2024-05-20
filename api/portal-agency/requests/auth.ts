import axiosInstance from "@/api/portal-agency/request-adapter";

export const portalAgencyLogin = (data: any) => axiosInstance.post('/auth/login', data)
export const portalAgencyCreateAccount = (data: any) => axiosInstance.post('/auth/create-account', data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const portalAgencyLogOut = (data: { refreshToken: string }) => axiosInstance.post('/auth/logout', data)

