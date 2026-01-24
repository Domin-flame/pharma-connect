import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { pharmacyService, productService } from '../services/api';
import { Search as SearchIcon, MapPin, Package, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pharmacy, Product } from '../types';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [activeTab, setActiveTab] = useState<'pharmacies' | 'products'>('pharmacies');
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [pharmRes, prodRes] = await Promise.all([
                    pharmacyService.getPharmacies({ name: query }),
                    productService.getProducts({ name: query }),
                ]);
                setPharmacies(pharmRes.data);
                setProducts(prodRes.data);
            } catch (err) {
                console.error(err);
                setError('Une erreur est survenue lors de la recherche.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    return (
        <div className="search-page container">
            <div className="search-header">
                <h1>Résultats pour "{query}"</h1>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'pharmacies' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pharmacies')}
                    >
                        Pharmacies ({pharmacies.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Produits ({products.length})
                    </button>
                </div>
            </div>

            <div className="results-content">
                {loading ? (
                    <div className="loading-state">Chargement des résultats...</div>
                ) : (
                    <div className="grid-results">
                        {activeTab === 'pharmacies' ? (
                            pharmacies.length > 0 ? (
                                pharmacies.map((pharmacy: Pharmacy) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={pharmacy.id}
                                        className="result-card glass"
                                    >
                                        <div className="card-body">
                                            <h3>{pharmacy.nom}</h3>
                                            <div className="info">
                                                <MapPin size={16} />
                                                <span>{pharmacy.adresse}</span>
                                            </div>
                                            <Link to={`/pharmacy/${pharmacy.id}`} className="btn-link">
                                                Voir le profil <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="empty-state">Aucune pharmacie trouvée.</div>
                            )
                        ) : (
                            products.length > 0 ? (
                                products.map((product: Product) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={product.id}
                                        className="result-card glass"
                                    >
                                        <div className="card-badge">{product.categorie}</div>
                                        <div className="card-body">
                                            <h3>{product.nom}</h3>
                                            <p className="price">{product.prix} FCFA</p>
                                            <div className="info">
                                                <Package size={16} />
                                                <span>{product.pharmacie_name}</span>
                                            </div>
                                            <button className="btn btn-primary btn-sm">Commander</button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="empty-state">Aucun produit trouvé.</div>
                            )
                        )}
                    </div>
                )}
            </div>

            <style>{`
        .search-page {
          padding: 40px 20px;
        }

        .search-header {
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 20px;
        }

        .tabs {
          display: flex;
          background: #edf2f7;
          padding: 5px;
          border-radius: 12px;
        }

        .tab {
          padding: 10px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.3s;
          color: var(--text-muted);
        }

        .tab.active {
          background: white;
          color: var(--primary);
          box-shadow: var(--shadow);
        }

        .grid-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .result-card {
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .result-card:hover {
          transform: translateY(-5px);
        }

        .card-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 206, 138, 0.1);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          margin: 12px 0;
          font-size: 0.9rem;
        }

        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--secondary);
          margin: 10px 0;
        }

        .btn-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 15px;
        }

        .empty-state, .loading-state {
          text-align: center;
          padding: 100px 0;
          color: var(--text-muted);
          font-size: 1.1rem;
          grid-column: 1 / -1;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.85rem;
          width: 100%;
        }
      `}</style>
        </div>
    );
};

export default SearchPage;
