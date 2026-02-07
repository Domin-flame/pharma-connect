import { useState } from "react";
import { Package, Clock, CheckCircle, XCircle, Search } from "lucide-react";

interface Reservation {
  id: string;
  patientName: string;
  medication: string;
  quantity: number;
  status: "pending" | "ready" | "completed" | "cancelled";
  date: string;
  time: string;
}

export default function Reservations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - replace with API call
  const [reservations] = useState<Reservation[]>([
    {
      id: "1",
      patientName: "Marie Dupont",
      medication: "Paracétamol 500mg",
      quantity: 2,
      status: "pending",
      date: "2026-02-07",
      time: "14:30",
    },
    {
      id: "2",
      patientName: "Jean Martin",
      medication: "Ibuprofène 400mg",
      quantity: 1,
      status: "ready",
      date: "2026-02-07",
      time: "10:15",
    },
    {
      id: "3",
      patientName: "Sophie Bernard",
      medication: "Amoxicilline 1g",
      quantity: 3,
      status: "completed",
      date: "2026-02-06",
      time: "16:45",
    },
  ]);

  const filteredReservations = reservations.filter((res) => {
    const matchesSearch =
      res.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.medication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || res.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Reservation["status"]) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      ready: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    const labels = {
      pending: "En attente",
      ready: "Prête",
      completed: "Complétée",
      cancelled: "Annulée",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getStatusIcon = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-600" size={20} />;
      case "ready":
        return <Package className="text-blue-600" size={20} />;
      case "completed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Réservations</h1>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{filteredReservations.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par patient ou médicament..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="ready">Prête</option>
            <option value="completed">Complétée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>
      </div>

      {/* Reservations list */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
            Aucune réservation trouvée
          </div>
        ) : (
          filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="mt-1">{getStatusIcon(reservation.status)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {reservation.patientName}
                    </h3>
                    <p className="text-gray-600 mt-1">{reservation.medication}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Quantité: {reservation.quantity}</span>
                      <span>•</span>
                      <span>
                        {reservation.date} à {reservation.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  {getStatusBadge(reservation.status)}
                  {reservation.status === "pending" && (
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Marquer prête
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
