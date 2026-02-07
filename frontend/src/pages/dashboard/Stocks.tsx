import { useState } from "react";
import { Package, AlertTriangle, Plus, Search, Edit2, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  expiryDate: string;
}

export default function Stocks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);

  // Mock data - replace with API call
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Paracétamol 500mg",
      category: "Analgésiques",
      stock: 150,
      minStock: 50,
      price: 2500,
      expiryDate: "2026-12-31",
    },
    {
      id: "2",
      name: "Ibuprofène 400mg",
      category: "Anti-inflammatoires",
      stock: 30,
      minStock: 40,
      price: 3500,
      expiryDate: "2026-08-15",
    },
    {
      id: "3",
      name: "Amoxicilline 1g",
      category: "Antibiotiques",
      stock: 80,
      minStock: 30,
      price: 5000,
      expiryDate: "2026-10-20",
    },
    {
      id: "4",
      name: "Aspirine 100mg",
      category: "Analgésiques",
      stock: 15,
      minStock: 25,
      price: 1500,
      expiryDate: "2027-03-10",
    },
  ]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLowStock = !showLowStock || product.stock < product.minStock;
    return matchesSearch && matchesLowStock;
  });

  const lowStockCount = products.filter((p) => p.stock < p.minStock).length;

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock < minStock) {
      return { label: "Stock faible", color: "text-red-600 bg-red-50" };
    } else if (stock < minStock * 1.5) {
      return { label: "Stock moyen", color: "text-yellow-600 bg-yellow-50" };
    }
    return { label: "Stock suffisant", color: "text-green-600 bg-green-50" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Stocks</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus size={20} />
          Ajouter un produit
        </button>
      </div>

      {/* Alert for low stock */}
      {lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          <div>
            <p className="font-semibold text-red-800">
              {lowStockCount} produit(s) en stock faible
            </p>
            <p className="text-sm text-red-600">
              Certains médicaments nécessitent un réapprovisionnement
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Low stock filter */}
          <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-gray-700">Stock faible uniquement</span>
          </label>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock, product.minStock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Package className="text-gray-400" size={20} />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{product.stock}</span>
                        <span className="text-gray-500 text-sm"> / {product.minStock}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{product.price} FCFA</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.expiryDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
