import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { pharmacyService, productService } from '../services/api';
import { Search as SearchIcon, MapPin, Package, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pharmacy, Product } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';
    
    const [activeTab, setActiveTab] = useState<'pharmacies' | 'products'>('products');
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(query);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

    // Fetch all data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [pharmRes, prodRes] = await Promise.all([
                    pharmacyService.getPharmacies({}),
                    productService.getProducts({}),
                ]);
                setPharmacies(pharmRes.data);
                setAllProducts(prodRes.data);
            } catch (err) {
                console.error(err);
                setError('Une erreur est survenue lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter results based on query
    useEffect(() => {
        if (query) {
            const filtered = allProducts.filter(p => 
                p.nom.toLowerCase().includes(query.toLowerCase())
            );
            setProducts(filtered);
        } else {
            setProducts([]);
        }
    }, [query, allProducts]);

    // Autocomplete suggestions
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.length > 1) {
            const filtered = allProducts.filter(p =>
                p.nom.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 8));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (product: Product) => {
        setSearchInput(product.nom);
        setSearchParams({ q: product.nom });
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ q: searchInput });
        setShowSuggestions(false);
    };

    // Filter products by selected pharmacy
    const filteredProducts = useMemo(() => {
        if (selectedPharmacy) {
            return products.filter(p => p.pharmacie === selectedPharmacy.id);
        }
        return products;
    }, [products, selectedPharmacy]);

    // Get pharmacy coordinates with fallback
    const getPharmacyCoordinates = (pharmacy: Pharmacy): [number, number] => {
        const lat = pharmacy.latitude || 3.8480;
        const lng = pharmacy.longitude || 11.5021;
        return [lat, lng];
    };

    const yaounde: [number, number] = [3.8480, 11.5021];

    return (
        <div className="search-page-container">
            {/* Search Bar */}
            <div className="search-bar-wrapper">
                <div className="container">
                    <form onSubmit={handleSearch} className="search-form glass">
                        <div className="search-input-wrapper">
                            <SearchIcon size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Rechercher un médicament..."
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                onFocus={() => searchInput.length > 1 && setShowSuggestions(true)}
                                className="search-input"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchInput('');
                                        setShowSuggestions(false);
                                    }}
                                    className="clear-btn"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">Rechercher</button>

                        {/* Autocomplete Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="suggestions-dropdown"
                                >
                                    {suggestions.map((product) => (
                                        <motion.button
                                            key={product.id}
                                            type="button"
                                            onClick={() => handleSuggestionClick(product)}
                                            whileHover={{ backgroundColor: 'rgba(0, 206, 138, 0.1)' }}
                                            className="suggestion-item"
                                        >
                                            <Package size={16} />
                                            <div className="suggestion-content">
                                                <div className="suggestion-name">{product.nom}</div>
                                                <div className="suggestion-pharmacy">{product.pharmacie_name}</div>
                                            </div>
                                            <div className="suggestion-price">{product.prix} FCFA</div>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="search-content-wrapper">
                <div className="search-container">
                    {/* Results Section */}
                    <div className="results-section">
                        <div className="section-header">
                            <div>
                                <h2>Résultats</h2>
                                {query && <p className="result-count">Trouvé {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}</p>}
                            </div>
                            <div className="tabs">
                                <button
                                    className={`tab ${activeTab === 'products' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('products')}
                                >
                                    Produits
                                </button>
                                <button
                                    className={`tab ${activeTab === 'pharmacies' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pharmacies')}
                                >
                                    Pharmacies
                                </button>
                            </div>
                        </div>

                        <div className="results-content">
                            {loading ? (
                                <div className="loading-state">Chargement des résultats...</div>
                            ) : error ? (
                                <div className="error-state">{error}</div>
                            ) : activeTab === 'products' ? (
                                filteredProducts.length > 0 ? (
                                    <div className="results-list">
                                        {filteredProducts.map((product: Product) => (
                                            <motion.div
                                                key={product.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="result-item glass"
                                            >
                                                <div className="result-category">{product.categorie}</div>
                                                <h3>{product.nom}</h3>
                                                <p className="result-description">{product.description}</p>
                                                <div className="result-footer">
                                                    <div className="result-meta">
                                                        <div className="result-price">{product.prix} FCFA</div>
                                                        <div className="result-pharmacy">
                                                            <MapPin size={14} />
                                                            {product.pharmacie_name}
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm">Commander</button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <SearchIcon size={48} />
                                        <p>Aucun produit trouvé</p>
                                        <small>Essayez une autre recherche</small>
                                    </div>
                                )
                            ) : (
                                <div className="pharmacies-list">
                                    {pharmacies.length > 0 ? (
                                        pharmacies.map((pharmacy: Pharmacy) => (
                                            <motion.div
                                                key={pharmacy.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                onClick={() => setSelectedPharmacy(selectedPharmacy?.id === pharmacy.id ? null : pharmacy)}
                                                className={`pharmacy-item glass ${selectedPharmacy?.id === pharmacy.id ? 'active' : ''}`}
                                            >
                                                <div className="pharmacy-header">
                                                    <h3>{pharmacy.nom}</h3>
                                                    {selectedPharmacy?.id === pharmacy.id && (
                                                        <motion.div
                                                            layoutId="active-indicator"
                                                            className="active-indicator"
                                                        />
                                                    )}
                                                </div>
                                                <div className="pharmacy-info">
                                                    <MapPin size={14} />
                                                    {pharmacy.adresse}
                                                </div>
                                                {pharmacy.telephone && (
                                                    <div className="pharmacy-info">
                                                        {pharmacy.telephone}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="empty-state">Aucune pharmacie trouvée</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="map-section">
                        <h2>Pharmacies Proche de Vous</h2>
                        <div className="map-wrapper">
                            <MapContainer
                                center={yaounde}
                                zoom={12}
                                scrollWheelZoom={true}
                                style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {pharmacies.map((pharmacy) => {
                                    const coords = getPharmacyCoordinates(pharmacy);
                                    const isSelected = selectedPharmacy?.id === pharmacy.id;
                                    
                                    return (
                                        <Marker
                                            key={pharmacy.id}
                                            position={coords}
                                            icon={isSelected ? createSelectedMarkerIcon() : L.Icon.Default.prototype}
                                            eventHandlers={{
                                                click: () => setSelectedPharmacy(pharmacy),
                                            }}
                                        >
                                            <Popup>
                                                <div className="pharmacy-popup">
                                                    <h4>{pharmacy.nom}</h4>
                                                    <p>{pharmacy.adresse}</p>
                                                    {pharmacy.telephone && <p>{pharmacy.telephone}</p>}
                                                    <Link to={`/pharmacy/${pharmacy.id}`} className="popup-link">
                                                        Voir le profil →
                                                    </Link>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .search-page-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a2b4b 0%, #0f1a30 100%);
                }

                .search-bar-wrapper {
                    padding: 30px 0;
                    background: linear-gradient(135deg, rgba(26, 43, 75, 0.9) 0%, rgba(15, 26, 48, 0.9) 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    position: sticky;
                    top: 80px;
                    z-index: 100;
                }

                .search-form {
                    display: flex;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    padding: 12px 16px;
                    position: relative;
                }

                .search-input-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                }

                .search-icon {
                    color: rgba(0, 206, 138, 0.6);
                }

                .search-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1rem;
                }

                .search-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                .clear-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.2s;
                }

                .clear-btn:hover {
                    color: rgba(255, 255, 255, 0.8);
                }

                .suggestions-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    margin-top: 4px;
                    overflow: hidden;
                    z-index: 1000;
                }

                .suggestion-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                }

                .suggestion-item:hover {
                    background: rgba(0, 206, 138, 0.1);
                }

                .suggestion-content {
                    flex: 1;
                    min-width: 0;
                }

                .suggestion-name {
                    font-weight: 600;
                    color: #333;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .suggestion-pharmacy {
                    font-size: 0.85rem;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .suggestion-price {
                    font-weight: 600;
                    color: #00ce8a;
                }

                .search-content-wrapper {
                    padding: 40px 20px;
                }

                .search-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 30px;
                }

                .results-section {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                }

                .section-header h2 {
                    font-size: 1.8rem;
                    margin-bottom: 5px;
                }

                .result-count {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .tabs {
                    display: flex;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 4px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .tab {
                    padding: 8px 16px;
                    border: none;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    border-radius: 6px;
                    font-weight: 500;
                    transition: all 0.3s;
                }

                .tab:hover {
                    color: rgba(255, 255, 255, 0.9);
                }

                .tab.active {
                    background: rgba(0, 206, 138, 0.2);
                    color: #00ce8a;
                    border: 1px solid rgba(0, 206, 138, 0.3);
                }

                .results-content {
                    flex: 1;
                }

                .results-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .result-item {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    padding: 24px;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .result-item:hover {
                    background: rgba(0, 206, 138, 0.1) !important;
                    border-color: rgba(0, 206, 138, 0.3) !important;
                    transform: translateX(8px);
                }

                .result-category {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: rgba(0, 206, 138, 0.2);
                    color: #00ce8a;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .result-item h3 {
                    color: white;
                    margin-bottom: 8px;
                    font-size: 1.2rem;
                }

                .result-description {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                    margin-bottom: 16px;
                    line-height: 1.4;
                }

                .result-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                }

                .result-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .result-price {
                    font-size: 1.4rem;
                    font-weight: bold;
                    background: linear-gradient(90deg, #00ce8a, #00ecc0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .result-pharmacy {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                }

                .btn-sm {
                    padding: 8px 16px;
                    font-size: 0.85rem;
                    white-space: nowrap;
                }

                .pharmacies-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .pharmacy-item {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    padding: 16px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }

                .pharmacy-item:hover {
                    background: rgba(0, 206, 138, 0.1) !important;
                    border-color: rgba(0, 206, 138, 0.3) !important;
                }

                .pharmacy-item.active {
                    background: rgba(0, 206, 138, 0.15) !important;
                    border-color: rgba(0, 206, 138, 0.5) !important;
                }

                .pharmacy-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .pharmacy-header h3 {
                    color: white;
                    margin: 0;
                    font-size: 1rem;
                }

                .active-indicator {
                    width: 8px;
                    height: 8px;
                    background: #00ce8a;
                    border-radius: 50%;
                }

                .pharmacy-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                }

                .map-section {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    height: fit-content;
                    position: sticky;
                    top: 150px;
                }

                .map-section h2 {
                    color: white;
                    font-size: 1.2rem;
                    margin: 0;
                }

                .map-wrapper {
                    height: 600px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .pharmacy-popup {
                    padding: 8px;
                }

                .pharmacy-popup h4 {
                    margin: 0 0 8px 0;
                    color: #333;
                }

                .pharmacy-popup p {
                    margin: 4px 0;
                    font-size: 0.9rem;
                    color: #666;
                }

                .popup-link {
                    display: inline-block;
                    margin-top: 8px;
                    color: #00ce8a;
                    text-decoration: none;
                    font-weight: 600;
                }

                .popup-link:hover {
                    text-decoration: underline;
                }

                .loading-state, .error-state, .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: rgba(255, 255, 255, 0.6);
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .empty-state svg {
                    opacity: 0.4;
                }

                .error-state {
                    color: #ff6b6b;
                }

                @media (max-width: 1024px) {
                    .search-container {
                        grid-template-columns: 1fr;
                    }

                    .map-section {
                        position: static;
                        height: 400px;
                    }

                    .map-wrapper {
                        height: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .search-bar-wrapper {
                        padding: 20px 0;
                    }

                    .search-form {
                        flex-direction: column;
                    }

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }

                    .tabs {
                        width: 100%;
                    }

                    .result-footer {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .btn-sm {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

// Helper function to create selected marker icon
function createSelectedMarkerIcon() {
    return L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41],
        popupAnchor: [0, -41],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });
}

export default SearchPage;
