import axiosInstance from '@/api/portal-user/request-adapter'

export const getPortalAgencyViaToken = () => axiosInstance.get('/user/via-token')