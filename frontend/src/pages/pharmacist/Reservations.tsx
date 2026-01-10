import { useEffect, useState } from 'react'
import { reservationService } from '../../services/reservationService'

export default function Reservations() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    reservationService.getPharmacyReservations(1) // pharmacyId
      .then(setReservations)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Réservations</h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Médicament</th>
            <th>Client</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-3">{r.medicament.name}</td>
              <td>{r.user.email}</td>
              <td>{r.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => reservationService.confirm(r.id)}
                  className="btn-success"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => reservationService.cancel(r.id)}
                  className="btn-danger"
                >
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}