import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <h1>Votre santé, <span className="text-gradient">à portée de clic.</span></h1>
            <p>Trouvez rapidement les médicaments dont vous avez besoin dans les pharmacies les plus proches de chez vous.</p>

            <form onSubmit={handleSearch} className="search-box glass">
              <div className="input-with-icon">
                <Search className="icon" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un médicament ou une pharmacie..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </motion.div>
        </div>
        <div className="hero-bg-accent"></div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="section-header">
          <h2>Pourquoi choisir PharmaConnect ?</h2>
          <p>La solution moderne pour faciliter l'accès aux soins.</p>
        </div>

        <div className="features-grid">
          <motion.div whileHover={{ y: -5 }} className="feature-card glass">
            <div className="feature-icon"><Search size={24} /></div>
            <h3>Recherche Rapide</h3>
            <p>Localisez instantanément les stocks disponibles en temps réel.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="feature-card glass">
            <div className="feature-icon"><MapPin size={24} /></div>
            <h3>Géoréservations</h3>
            <p>Réservez vos produits dans la pharmacie la plus proche.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="feature-card glass">
            <div className="feature-icon"><ShieldCheck size={24} /></div>
            <h3>Sécurisé</h3>
            <p>Vos données de santé sont protégées et vos transactions sécurisées.</p>
          </motion.div>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          padding: 100px 0 140px;
          overflow: hidden;
          background: linear-gradient(135deg, #1a2b4b 0%, #0f1a30 100%);
          color: white;
          text-align: center;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          color: white;
          line-height: 1.1;
        }

        .text-gradient {
          background: linear-gradient(90deg, #00ce8a, #00ecc0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .search-box {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          padding: 10px;
          gap: 10px;
          background: rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }

        .input-with-icon {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-with-icon .icon {
          position: absolute;
          left: 15px;
          color: var(--primary);
        }

        .input-with-icon input {
          padding-left: 45px;
          background: white;
          border: none;
        }

        .hero-bg-accent {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 206, 138, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .features {
          padding: 80px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .feature-card {
          padding: 40px;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: rgba(0, 206, 138, 0.1);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .feature-card h3 {
          margin-bottom: 15px;
        }

        .btn-logout {
          background: transparent;
          border: none;
          color: var(--secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 50%;
          transition: background 0.3s;
        }

        .btn-logout:hover {
          background: rgba(0,0,0,0.05);
          color: var(--accent);
        }
      `}</style>
    </div>
  );
};

export default Home;
