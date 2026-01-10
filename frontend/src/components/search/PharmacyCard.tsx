const PharmacyCard = ({ pharmacy, onSelect, isSelected }) => { 
    return ( 
        <div 
            onClick={() => onSelect(pharmacy)} 
            className={ 
                bg-white rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 
                ${isSelected 
                    ? 'border-emerald-600 shadow-lg' 
                    : 'border-gray-200 hover:border-emerald-300 hover:shadow-md' 
                } 
            } 
        > 
            {/* Header */} 
            <div className="flex justify-between items-start mb-4"> 
                <div className="flex-1"> 
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{pharmacy.name}</h3> 
                    <p className="text-sm text-gray-600 flex items-center gap-1"> 
                        <MapPin size={14} /> 
                        {pharmacy.address} 
                    </p> 
                </div> 
                <span className={ 
                    px-3 py-1 rounded-full text-xs font-medium 
                    ${pharmacy.isOpen 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800' 
                    } 
                }> 
                    {pharmacy.isOpen ? 'Ouvert' : 'Fermé'} 
                </span> 
            </div> 
            
            {/* Info Row */} 
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600"> 
                <div className="flex items-center gap-1"> 
                    <Navigation size={14} /> 
                    <span>{pharmacy.distance} km</span> 
                </div> 
                <div className="flex items-center gap-1"> 
                    <Clock size={14} /> 
                    <span>{pharmacy.hours}</span> 
                </div> 
                <div className="flex items-center gap-1"> 
                    <Star 
                        size={14} 
                        className="text-amber-500" 
                        fill="currentColor" 
                    /> 
                    <span>{pharmacy.rating}</span> 
                </div> 
            </div> 
            
            {/* Medication Info */} 
            <div className="border-t pt-4"> 
                <div className="flex justify-between items-center"> 
                    <div> 
                        <p className="text-sm text-gray-600 mb-1">{pharmacy.medicationName}</p> 
                        <p className="text-2xl font-bold text-gray-900">{pharmacy.price} FCFA</p> 
                    </div> 
                    <div className="flex flex-col items-end gap-2"> 
                        <span className={ 
                            px-3 py-1 rounded-full text-xs font-medium 
                            ${pharmacy.stock > 10 
                                ? 'bg-green-100 text-green-800' 
                                : pharmacy.stock > 0 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-red-100 text-red-800' 
                            } 
                        }> 
                         {pharmacy.stock > 0 ? ${pharmacy.stock} en stock : 'Rupture'} 
                        </span> 
                        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-1"> 
                            Réserver 
                            <ChevronRight size={16} 
                        /> 
                        </button> 
                    </div> 
                </div> 
            </div> 
            
            {/* Contact */} 
            <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-gray-600"> 
                <Phone size={14} /> 
                <span>{pharmacy.phone}</span> 
            </div> 
        </div> 
    ); 
};