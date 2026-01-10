import { Routes, Route, NavLink } from 'react-router-dom'
import Reservations from './Reservations'
import Stocks from './Stocks'
import PharmacyProfile from './PharmacyProfile'

export default function PharmacistDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 font-bold text-emerald-600 text-xl">
          PharmaConnect
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <NavLink to="reservations" className="nav-link">
            Réservations
          </NavLink>
          <NavLink to="stocks" className="nav-link">
            Stocks
          </NavLink>
          <NavLink to="profil" className="nav-link">
            Ma pharmacie
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="reservations" element={<Reservations />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="profil" element={<PharmacyProfile />} />
        </Routes>
      </main>
    </div>
  )
}