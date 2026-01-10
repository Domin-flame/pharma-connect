export default function SearchPage() {
     const [searchQuery, setSearchQuery] = useState(''); 
     const [filters, setFilters] = useState({ 
        distance: 5,
        inStockOnly: false, 
        openNow: false 
    }); 
    const [showFilters, setShowFilters] = useState(false); 
    const [selectedPharmacy, setSelectedPharmacy] = useState(null); 
    const [isSearching, setIsSearching] = useState(false);
    
    // Mock Data (à remplacer par l'API) 
    const { data, isLoading, error } = useSearchMedicaments ( searchQuery, filters)
        

const handleSearch = () => { 
    setIsSearching(true); 
    // Simuler une recherche API 
    setTimeout(() => { 
        setIsSearching(false);
     }, 500); 
}; 

return ( 
    <div className="min-h-screen bg-gray-50"> 
    {/* Header avec barre de recherche */} 
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30"> 
        <div className="max-w-7xl mx-auto px-4 py-6"> 
            <SearchBar 
                onSearch={handleSearch} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            /> 
        </div> 
    </div> 
    {/* Contenu principal */} 
    <div className="max-w-7xl mx-auto px-4 py-6"> 
        <div className="flex gap-6"> 
            {/* Filters Sidebar */} 
            <FiltersSidebar 
                filters={filters} 
                setFilters={setFilters} 
                isOpen={showFilters} 
                onClose={() => setShowFilters(false)} 
            /> 
            {/* Results */} 
            <div className="flex-1"> 
                {/* Mobile Filter Button */} 
                <button 
                    onClick={() => setShowFilters(true)} 
                    className="lg:hidden w-full mb-4 px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium" > 
                    <Filter size={20} /> 
                    Filtres 
                </button> 
                
                {/* Results Header */} 
                <div className="flex justify-between items-center mb-6"> 
                    <h2 className="text-2xl font-bold text-gray-900"> 
                        {mockPharmacies.length} résultat(s) trouvé(s) 
                    </h2> 
                    {searchQuery && (
                        <div className="text-sm text-gray-600"> 
                         pour "{searchQuery}" 
                        </div>
                    )}
                </div> 
                
                {/* Results Grid */} 
                <div className="grid lg:grid-cols-2 gap-6"> 
                    
                    {/* Left: Pharmacy Cards */} 
                    <div className="space-y-4"> 
                        {isSearching ? ( 
                            <div className="flex justify-center py-12"> 
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent" /> 
                            </div> 
                        ) : ( 
                            mockPharmacies.map(pharmacy => ( 
                                <PharmacyCard 
                                    key={pharmacy.id} 
                                    pharmacy={pharmacy} 
                                    onSelect={setSelectedPharmacy} 
                                    isSelected={selectedPharmacy?.id === pharmacy.id} 
                                /> 
                            )) 
                        )} 
                    </div> 
                    
                    {/* Right: Map */} 
                    <div className="hidden lg:block"> 
                        <SimpleMap 
                            pharmacies={mockPharmacies} 
                            selectedPharmacy={selectedPharmacy} 
                            onSelectPharmacy={setSelectedPharmacy} 
                        /> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
</div> 
); 
}