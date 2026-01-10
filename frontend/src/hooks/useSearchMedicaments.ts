import { useQuery } from '@tanstack/react-query'
import { medicamentService } from '../services/medicamentService'
import { QUERY_KEYS } from '../constants/queryKeys'

export function useSearchMedicaments(
  query: string,
  filters: Record<string, any>
) {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAMENTS, query, filters],
    queryFn: () => medicamentService.search(query, filters),
    enabled: query.length > 2,
  })
}