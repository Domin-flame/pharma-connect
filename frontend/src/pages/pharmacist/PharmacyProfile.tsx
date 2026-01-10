import { useEffect, useState } from 'react'
import { pharmacyService } from '../../services/pharmacyService'

export default function PharmacyProfile() {
  const [pharmacy, setPharmacy] = useState<any>(null)

  useEffect(() => {
    pharmacyService.getById(1).then(setPharmacy)
  }, [])

  if (!pharmacy) return null

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ma pharmacie</h1>

      <p><strong>Nom :</strong> {pharmacy.name}</p>
      <p><strong>Adresse :</strong> {pharmacy.address}</p>
      <p><strong>Téléphone :</strong> {pharmacy.phone}</p>
    </div>
  )
}