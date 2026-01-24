import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pharmacyService, productService } from '../services/api';
import { MapPin, Phone, Clock, Package, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pharmacy, Product } from '../types';

import Map from '../components/Map';

const PharmacyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const [pharmRes, prodRes] = await Promise.all([
                    pharmacyService.getPharmacy(id),
                    productService.getProducts({ pharmacie: id }),
                ]);
                setPharmacy(pharmRes.data);
                setProducts(prodRes.data);
            } catch (err) {
                console.error(err);
                setError('Erreur lors du chargement des détails de la pharmacie.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDirections = () => {
        if (pharmacy?.latitude && pharmacy?.longitude) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
            window.open(url, '_blank');
        } else {
            alert("Les coordonnées de cette pharmacie ne sont pas disponibles.");
        }
    };

    if (loading) return <div className="container py-10">Chargement...</div>;
    if (!pharmacy) return <div className="container py-10">Pharmacie non trouvée.</div>;

    return (
        <div className="pharmacy-detail container">
            <Link to="/search" className="back-link">
                <ChevronLeft size={20} /> Retour aux recherches
            </Link>

            <div className="pharmacy-header glass">
                <div className="header-content">
                    <div className="header-info">
                        <h1>{pharmacy.nom}</h1>
                        <div className="rating">
                            <Star size={16} fill="gold" color="gold" />
                            <span>4.8 (120 avis)</span>
                        </div>
                        <p className="description">{pharmacy.description || "Votre partenaire santé de confiance au quotidien."}</p>

                        <div className="contact-info">
                            <div className="info-item">
                                <MapPin size={18} />
                                <span>{pharmacy.adresse}</span>
                            </div>
                            <div className="info-item">
                                <Phone size={18} />
                                <span>{pharmacy.telephone || "+225 01 02 03 04 05"}</span>
                            </div>
                            <div className="info-item">
                                <Clock size={18} />
                                <span>Ouvert 24h/24, 7j/7</span>
                            </div>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-primary">Contacter la pharmacie</button>
                        <button className="btn btn-secondary" onClick={handleDirections}>Itinéraire</button>
                    </div>
                </div>
            </div>

            <div className="pharmacy-layout">
                <div className="inventory">
                    <h2>Produits disponibles</h2>
                    <div className="inventory-grid">
                        {products.map((product: Product) => (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                key={product.id}
                                className="product-card glass"
                            >
                                <h3>{product.nom}</h3>
                                <p className="category">{product.categorie}</p>
                                <div className="price-tag">{product.prix} FCFA</div>
                                <button className="btn btn-primary btn-sm">Ajouter au panier</button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="map-sidebar">
                    <h3>Localisation</h3>
                    {pharmacy.latitude && pharmacy.longitude ? (
                        <Map lat={pharmacy.latitude} lng={pharmacy.longitude} name={pharmacy.nom} />
                    ) : (
                        <div className="map-placeholder glass">
                            <MapPin size={48} />
                            <p>Carte non disponible</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .pharmacy-detail { padding: 40px 20px; }
        .back-link { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          color: var(--text-muted); 
          text-decoration: none; 
          margin-bottom: 30px; 
          font-weight: 501;
        }

        .pharmacy-header {
          padding: 40px;
          margin-bottom: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(0, 206, 138, 0.05));
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
        }

        .header-info h1 { font-size: 2.5rem; margin-bottom: 15px; }
        .rating { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; font-weight: 600; }
        .description { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 30px; max-width: 600px; }

        .contact-info { display: flex; flex-direction: column; gap: 15px; }
        .info-item { display: flex; align-items: center; gap: 12px; color: var(--secondary); font-weight: 501; }

        .header-actions { display: flex; flex-direction: column; gap: 15px; min-width: 200px; }

        .pharmacy-layout {
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 40px;
        }

        .inventory h2 { margin-bottom: 30px; }
        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .product-card { padding: 25px; text-align: center; }
        .product-card h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .category { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
        .price-tag { font-size: 1.4rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; }

        .map-sidebar { position: sticky; top: 20px; }
        .map-sidebar h3 { margin-bottom: 20px; }
        .map-placeholder {
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            background: #f8fafc;
        }

        @media (max-width: 1024px) {
            .pharmacy-layout { grid-template-columns: 1fr; }
            .map-sidebar { position: static; order: -1; }
        }

        @media (max-width: 768px) {
          .header-content { flex-direction: column; }
          .header-actions { width: 100%; flex-direction: row; }
          .header-actions .btn { flex: 1; }
        }
      `}</style>
        </div>
    );
};

export default PharmacyDetail;
