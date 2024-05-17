import useSWR from 'swr'
import { getPortalUserViaToken } from '@/api/portal-user/requests/user'

export default function useGetPortalUser() {
    const fetcher = async () => {
        const { data } = await getPortalUserViaToken()
        return data
    }
    const { data, error, isLoading, mutate } = useSWR('/portal/user/via-token', fetcher)

    return {
        portalUser: data,
        portalUserError: error,
        portalUserLoading: isLoading,
        mutatePortalUser: mutate
    }
}