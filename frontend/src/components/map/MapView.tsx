import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Minimize2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Pharmacy {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
}

const MapView: React.FC = () => {
    // Pharmacies data with Yaoundé focus
    const [pharmacies] = useState<Pharmacy[]>([
        { id: 1, name: "Pharmacie Centrale", address: "Nouvelle-Ville, Yaoundé", lat: 3.8480, lng: 11.5021 },
        { id: 2, name: "Pharmacie de la Paix", address: "Plateau Avezoué, Yaoundé", lat: 3.8510, lng: 11.4950 },
        { id: 3, name: "Pharmacie du Marché", address: "Mfoundi, Yaoundé", lat: 3.8470, lng: 11.5080 },
        { id: 4, name: "Pharmacie Moderne", address: "Bastos, Yaoundé", lat: 3.8650, lng: 11.4880 },
        { id: 5, name: "Pharmacie Santé Plus", address: "Nkolbisson, Yaoundé", lat: 3.8350, lng: 11.5150 },
        { id: 6, name: "Pharmacie du Douala", address: "Douala, Cameroun", lat: 4.0511, lng: 9.7679 },
    ]);

    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

    // Center on Yaoundé
    const yaounde: [number, number] = [3.8480, 11.5021];

    return (
        <div className="map-view-container">
            <div className="map-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="header-content"
                >
                    <h1>Carte des Pharmacies</h1>
                    <p>Trouvez les pharmacies les plus proches de vous à Yaoundé</p>
                </motion.div>
            </div>

            <div className="map-content">
                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="map-section"
                >
                    <div className="map-wrapper">
                        <MapContainer
                            center={yaounde}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {pharmacies.map((pharmacy) => (
                                <Marker
                                    key={pharmacy.id}
                                    position={[pharmacy.lat, pharmacy.lng]}
                                    eventHandlers={{
                                        click: () => setSelectedPharmacy(pharmacy),
                                    }}
                                >
                                    <Popup>
                                        <div className="pharmacy-popup">
                                            <h4>{pharmacy.name}</h4>
                                            <p className="popup-address">{pharmacy.address}</p>
                                            <a href={`/pharmacy/${pharmacy.id}`} className="popup-link">
                                                Voir le profil →
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Legend */}
                    <div className="map-legend">
                        <div className="legend-item">
                            <MapPin size={16} />
                            <span>Cliquez sur un marqueur pour plus d'informations</span>
                        </div>
                    </div>
                </motion.div>

                {/* Pharmacies List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pharmacies-list-section"
                >
                    <h2>Pharmacies Listées ({pharmacies.length})</h2>
                    <div className="pharmacies-list">
                        {pharmacies.map((pharmacy) => (
                            <motion.div
                                key={pharmacy.id}
                                onClick={() => setSelectedPharmacy(selectedPharmacy?.id === pharmacy.id ? null : pharmacy)}
                                whileHover={{ x: 4 }}
                                className={`pharmacy-card ${selectedPharmacy?.id === pharmacy.id ? 'active' : ''}`}
                            >
                                <div className="pharmacy-card-icon">
                                    <MapPin size={20} />
                                </div>
                                <div className="pharmacy-card-content">
                                    <h3>{pharmacy.name}</h3>
                                    <p>{pharmacy.address}</p>
                                </div>
                                {selectedPharmacy?.id === pharmacy.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="active-indicator"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                .map-view-container {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    padding: 30px;
                }

                .map-header {
                    margin-bottom: 20px;
                }

                .header-content h1 {
                    font-size: 2rem;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 8px;
                }

                .header-content p {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1rem;
                }

                .map-content {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 30px;
                }

                .map-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .map-wrapper {
                    height: 500px;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 206, 138, 0.15);
                }

                .map-legend {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 16px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                }

                .legend-item svg {
                    color: #00ce8a;
                }

                .pharmacies-list-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .pharmacies-list-section h2 {
                    font-size: 1.2rem;
                    color: white;
                    margin: 0;
                }

                .pharmacies-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-height: 600px;
                    overflow-y: auto;
                }

                .pharmacies-list::-webkit-scrollbar {
                    width: 6px;
                }

                .pharmacies-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .pharmacies-list::-webkit-scrollbar-thumb {
                    background: rgba(0, 206, 138, 0.3);
                    border-radius: 10px;
                }

                .pharmacies-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 206, 138, 0.5);
                }

                .pharmacy-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }

                .pharmacy-card:hover {
                    background: rgba(0, 206, 138, 0.1);
                    border-color: rgba(0, 206, 138, 0.3);
                }

                .pharmacy-card.active {
                    background: rgba(0, 206, 138, 0.15);
                    border-color: rgba(0, 206, 138, 0.5);
                }

                .pharmacy-card-icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(0, 206, 138, 0.2);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00ce8a;
                    flex-shrink: 0;
                }

                .pharmacy-card-content {
                    flex: 1;
                    min-width: 0;
                }

                .pharmacy-card-content h3 {
                    color: white;
                    margin: 0 0 4px 0;
                    font-size: 0.95rem;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .pharmacy-card-content p {
                    color: rgba(255, 255, 255, 0.6);
                    margin: 0;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .active-indicator {
                    width: 8px;
                    height: 8px;
                    background: #00ce8a;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .pharmacy-popup {
                    padding: 12px;
                }

                .pharmacy-popup h4 {
                    margin: 0 0 8px 0;
                    color: #333;
                    font-size: 0.95rem;
                }

                .popup-address {
                    margin: 4px 0;
                    font-size: 0.85rem;
                    color: #666;
                    line-height: 1.3;
                }

                .popup-link {
                    display: inline-block;
                    margin-top: 8px;
                    color: #00ce8a;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }

                .popup-link:hover {
                    text-decoration: underline;
                }

                @media (max-width: 1024px) {
                    .map-content {
                        grid-template-columns: 1fr;
                    }

                    .pharmacies-list-section {
                        max-height: 300px;
                    }

                    .map-wrapper {
                        height: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .map-view-container {
                        padding: 20px;
                        gap: 20px;
                    }

                    .header-content h1 {
                        font-size: 1.5rem;
                    }

                    .map-wrapper {
                        height: 300px;
                    }

                    .pharmacies-list-section h2 {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default MapView;
