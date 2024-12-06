import { QueryClient } from '@tanstack/react-query'

export const ONE_DAY = 1000 * 60 * 60 * 24
export const FIVE_MINUTES = 1000 * 60 * 5

export const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                gcTime: ONE_DAY,
                staleTime: FIVE_MINUTES,
                retry: 1,
                refetchOnMount: false,
                refetchOnReconnect: 'always'
            },
            mutations: {
                retry: 1
            }
        }
    })
}

export const useQueryConfig = (key: string) => ({
    queryKey: [key],
    staleTime: FIVE_MINUTES,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always'
}) 