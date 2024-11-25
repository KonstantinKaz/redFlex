import { useDebounce } from '@/hooks/useDebounce'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useSearchFrom = () => {
	const { control, watch } = useForm({
		mode: 'onChange'
	})

	const searchTerm = watch('searchTerm')
	const debouncedSearch = useDebounce(searchTerm, 500)

	return useMemo(() => ({ debouncedSearch, searchTerm, control }), [searchTerm])
}
