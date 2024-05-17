import axiosInstance from '@/api/portal-user/request-adapter'

export const getPortalUserViaToken = () => axiosInstance.get('/user/via-token')