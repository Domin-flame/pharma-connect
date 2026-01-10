import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reservationService } from '../services/reservationService'
import { QUERY_KEYS } from '../constants/queryKeys'

export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reservationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESERVATIONS],
      })
    }
  })
}