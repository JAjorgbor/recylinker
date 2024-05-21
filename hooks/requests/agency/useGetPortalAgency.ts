import useSWR from 'swr'
import { getPortalAgencyViaToken } from '@/api/portal-agency/requests/user'

export default function useGetPortalAgency() {
    const fetcher = async () => {
        const { data } = await getPortalAgencyViaToken()
        return data
    }

    const { data, error, isLoading, mutate } = useSWR('/portal-agency/user/via-token', fetcher)

    return {
        portalAgency: data,
        portalAgencyError: error,
        portalAgencyLoading: isLoading,
        mutatePortalUser: mutate
    }
}