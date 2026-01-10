const SimpleMap = ({ pharmacies, selectedPharmacy, onSelectPharmacy }) => { 
    return ( 
        <div className="sticky top-4 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl h-[600px] flex items-center justify-center relative overflow-hidden"> 
            {/* Map Background Pattern */} 
            <div className="absolute inset-0 opacity-10"> 
                <svg width="100%" height="100%"> 
                    <defs> 
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"> 
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/> 
                        </pattern> 
                    </defs> 
                    <rect width="100%" height="100%" fill="url(#grid)" /> 
                </svg> 
            </div> 
            {/* Map Content */} 
            <div className="relative z-10 text-center p-8"> 
                <MapPin size={64} className="mx-auto mb-4 text-emerald-600" /> 
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Carte Interactive</h3> 
                <p className="text-gray-600 mb-6"> 
                    {pharmacies.length} pharmacie(s) à proximité 
                </p> 
                
                {/* Pharmacy Markers (Simplified) */} 
                <div className="grid grid-cols-2 gap-3 mt-8"> 
                    {pharmacies.slice(0, 4).map((pharmacy, index) => ( 
                        <button 
                            key={index} 
                            onClick={() => onSelectPharmacy(pharmacy)} 
                            className={ 
                                p-4 rounded-lg border-2 transition text-left 
                                ${selectedPharmacy?.id === pharmacy.id 
                                    ? 'bg-white border-emerald-600 shadow-lg' 
                                    : 'bg-white/80 border-white hover:border-emerald-300' 
                                } 
                            } 
                        > 
                            <div className="flex items-start gap-2"> 
                                <MapPin size={16} className="text-emerald-600 mt-1" /> 
                                <div> 
                                    <p className="font-semibold text-sm text-gray-900">{pharmacy.name}</p> 
                                    <p className="text-xs text-gray-600">{pharmacy.distance} km</p> 
                                </div> 
                            </div> 
                        </button> 
                        ))
                    } 
                </div> 
                
                <p className="text-xs text-gray-500 mt-6"> 💡 Intégration Google Maps ou Leaflet à venir </p> 
            </div> 
        </div> 
    ); 
};