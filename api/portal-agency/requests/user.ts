import axiosInstance from '@/api/portal-agency/request-adapter'

export const getPortalAgencyViaToken = () => axiosInstance.get('/user/via-token')