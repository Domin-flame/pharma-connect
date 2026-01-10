import { type Dispatch, type SetStateAction } from 'react';
import { X, Filter } from 'lucide-react';

type Filters = {
    distance: number;
    inStockOnly: boolean;
    openNow: boolean;
};

type Props = {
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    isOpen: boolean;
    onClose: () => void;
};

export default function FiltersSidebar({ filters, setFilters, isOpen, onClose }: Props) {
    const distances = [1, 5, 10, 20];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 p-6 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } overflow-y-auto`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Filter size={20} />
                        Filtres
                    </h3>
                    <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Distance Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Distance maximale</label>
                    <div className="space-y-2">
                        {distances.map((distance) => (
                            <button
                                key={distance}
                                onClick={() => setFilters({ ...filters, distance })}
                                className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                                    filters.distance === distance
                                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                                        : 'border-gray-200 hover:border-emerald-300'
                                }`}
                            >
                                {distance} km
                            </button>
                        ))}
                    </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.inStockOnly}
                            onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                            className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700 font-medium">Disponible immédiatement</span>
                    </label>
                </div>

                {/* Open Now Filter */}
                <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.openNow}
                            onChange={(e) => setFilters({ ...filters, openNow: e.target.checked })}
                            className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700 font-medium">Ouvert maintenant</span>
                    </label>
                </div>

                {/* Reset Filters */}
                <button
                    onClick={() =>
                        setFilters({
                            distance: 5,
                            inStockOnly: false,
                            openNow: false,
                        })
                    }
                    className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                    Réinitialiser les filtres
                </button>
            </aside>
        </>
    );
}