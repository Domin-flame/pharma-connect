import { useState } from 'react';
import { Search, Shield, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pt-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"></div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield size={16} className="mr-2" />
              Plateforme sécurisée et fiable
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez vos médicaments en <span className="text-emerald-600">un clic</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Recherchez, localisez et réservez vos médicaments dans les pharmacies à proximité. 
              Fini les déplacements inutiles !
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-2 flex items-center mb-6">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un médicament (ex: Doliprane, Amoxicilline...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition font-medium flex items-center">
                Rechercher
                <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
              
          </div>
        </div>
      </div>
  )
}

export default HeroSection
