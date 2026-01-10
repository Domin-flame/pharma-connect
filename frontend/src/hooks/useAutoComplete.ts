import { useQuery } from '@tanstack/react-query'
import { medicamentService } from '../services/medicamentService'
import { QUERY_KEYS } from '../constants/queryKeys'

export function useAutocomplete(query: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAMENTS, 'autocomplete', query],
    queryFn: () => medicamentService.autocomplete(query),
    enabled: query.length > 2,
  })
}