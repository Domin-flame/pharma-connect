import { useEffect, useState } from 'react'
import { pharmacyService } from '../../services/pharmacyService'

export default function Stocks() {
  const [stocks, setStocks] = useState<any[]>([])

  useEffect(() => {
    pharmacyService.getStocks(1).then(setStocks)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Stocks</h1>

      {stocks.map((s) => (
        <div
          key={s.id}
          className="bg-white p-4 rounded shadow mb-3"
        >
          <p className="font-semibold">{s.medicament.name}</p>
          <p>Quantité : {s.quantity}</p>
          <p>Prix : {s.price} FCFA</p>
        </div>
      ))}
    </div>
  )
}