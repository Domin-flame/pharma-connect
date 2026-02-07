import { Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MapPin, Package, User, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Reservations from "./Reservations";
import Stocks from "./Stocks";
import PharmacyProfile from "./PharmacyProfile"; 
import MapView from "../../components/map/MapView";

export default function PharmacistDashboard() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    if (path === "") return currentPath === "/dashboard" || currentPath === "/dashboard/";
    return currentPath.includes(`/dashboard/${path}`);
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Package size={32} className="sidebar-icon" />
          <span>PharmaConnect</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className={navClass({ isActive: isActive("") })}>
            <LayoutDashboard className="inline mr-2" size={18} />
            Tableau de bord
          </Link>
          <Link to="/dashboard/reservations" className={navClass({ isActive: isActive("reservations") })}>
            <Package size={18} className="inline mr-2" />
            Réservations
          </Link>
          <Link to="/dashboard/stocks" className={navClass({ isActive: isActive("stocks") })}>
            <Package size={18} className="inline mr-2" />
            Stocks
          </Link>
          <Link to="/dashboard/profil" className={navClass({ isActive: isActive("profil") })}>
            <User size={18} className="inline mr-2" />
            Ma pharmacie
          </Link>
          <Link to="/dashboard/map" className={navClass({ isActive: isActive("map") })}>
            <MapPin size={18} className="inline mr-2" />
            Voir la carte
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="header-content"
          >
            <h1 className="header-title">Tableau de bord du Pharmacien</h1>
            <p className="header-subtitle">Bienvenue sur votre espace de gestion</p>
          </motion.div>
          <button className="notification-btn">
            <Bell size={24} />
            <span className="notification-badge"></span>
          </button>
        </div>

        <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="stocks" element={<Stocks />} />
            <Route path="profil" element={<PharmacyProfile />} />
            <Route path="map" element={<MapView />} />
          </Routes>
      </main>

      <style>{`
        .dashboard-page {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a2b4b 0%, #0f1a30 100%);
          color: white;
        }

        .dashboard-sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border-right: 1px solid rgba(255, 255, 255, 0.18);
          padding: 30px 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 24px 40px;
          font-size: 1.5rem;
          font-weight: bold;
          color: #00ce8a;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .sidebar-icon {
          color: #00ce8a;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px;
        }

        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 10px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .sidebar-nav a:hover {
          background: rgba(0, 206, 138, 0.1);
          color: #00ce8a;
          transform: translateX(4px);
        }

        .sidebar-nav a.active {
          background: linear-gradient(135deg, #00ce8a 0%, #00ecc0 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 206, 138, 0.3);
        }

        .dashboard-main {
          margin-left: 280px;
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
        }

        .header-content {
          flex: 1;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #00ce8a, #00ecc0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .notification-btn {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .notification-btn:hover {
          background: rgba(0, 206, 138, 0.2);
          border-color: rgba(0, 206, 138, 0.4);
        }

        .notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #ff4757;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 71, 87, 0.6);
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: 200px;
            padding: 20px 0;
          }

          .dashboard-main {
            margin-left: 200px;
            padding: 20px;
          }

          .header-title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 640px) {
          .dashboard-sidebar {
            position: absolute;
            width: 250px;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .dashboard-main {
            margin-left: 0;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

function navClass({ isActive }: { isActive: boolean }) {
  return `${isActive ? "active" : ""}`;
}

function DashboardHome() {
  return ( 
    <div className="dashboard-content">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="content-title"
      >
        Bienvenue pharmacien
      </motion.h2>

      {/* Stat cards */}
      <div className="stats-grid">
        <motion.div
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatCard title="Total des réservations" value="128" subtittle="Aujourd'hui" />
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatCard title="Médicaments en stock" value="342"  subtittle="Articles" />
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatCard title="Alertes" value="5" subtittle="A traiter" />
        </motion.div>
      </div>

      {/* Additional dashboard content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="activity-card glass"
      >
        <h3 className="activity-title">Activité récente</h3>
        <ul className="activity-list">
          <li><span className="activity-dot"></span>Nouvelle réservation - Paracétamol</li>
          <li><span className="activity-dot"></span>Stock de Ibuprofène mis à jour</li>
          <li><span className="activity-dot"></span>Alertes à traiter</li>
        </ul>
      </motion.div>

      <style>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .content-title {
          font-size: 2.2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 10px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 20px;
        }

        .activity-card {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 30px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .activity-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
        }

        .activity-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-list li {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #00ce8a, #00ecc0);
          border-radius: 50%;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, subtittle }: { title: string; value: string; subtittle: string }) {
  return (
    <div className="stat-card glass">
      <h2 className="stat-title">{title}</h2>
      <p className="stat-value">{value}</p>
      <p className="stat-subtitle">{subtittle}</p>

      <style>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 24px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(0, 206, 138, 0.15);
          border-color: rgba(0, 206, 138, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(0, 206, 138, 0.2);
        }

        .stat-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #00ce8a, #00ecc0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
