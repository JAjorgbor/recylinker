import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RECYLINKER_API_URL + '/portal-agency',
  timeout: 30000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
  cors: true,
})

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get('portalAgencyAccessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message !== 'Incorrect email or password' &&
      !originalConfig._retry
    ) {
      originalConfig._retry = false
      try {
        const refreshToken = Cookies.get('portalAgencyRefreshToken')
        const { data } = await axiosInstance.post('auth/refresh-tokens', {
          refreshToken,
        })

        const newRefreshToken = data.refresh.token

        // Update local storage with new refresh token
        Cookies.set('portalAgencyRefreshToken', newRefreshToken, {
          expires: 30,
        })

        Cookies.set('portalAgencyAccessToken', data.access.token)

        // Update the authorization header for the instance
        axiosInstance.defaults.headers.Authorization = `Bearer ${data.access.token}`

        // Update the original request with the updated header
        originalConfig.headers.Authorization = `Bearer ${data.access.token}`

        // Repeat the original request with the new access token
        return axiosInstance(originalConfig)
      } catch (error) {
        console.log(error)
        // Redirect to login page here
        const cookieJar = Cookies.get() // Get all existing cookies
        for (const cookieName in cookieJar) {
          // Remove each cookie one by one
          cookieName !== 'theme' ? Cookies.remove(cookieName) : null
        }
        window.location.href = '/agency'

        return Promise.reject(error)
      }
    }

    return Promise.reject(error.response)
  }
)

export default axiosInstance
