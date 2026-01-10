import { Search, MapPin, Phone } from 'lucide-react';

const steps = [
    {
      icon: <Search size={32} />,
      title: "Recherchez votre médicament",
      description: "Utilisez notre barre de recherche pour trouver le médicament dont vous avez besoin"
    },
    {
      icon: <MapPin size={32} />,
      title: "Trouvez la pharmacie la plus proche",
      description: "Visualisez sur la carte les pharmacies qui ont votre médicament en stock"
    },
    {
      icon: <Phone size={32} />,
      title: "Réservez en un clic",
      description: "Réservez votre médicament et récupérez-le dans les 24h en pharmacie"
    }
];

const HowItWorks = () => {

    return (
        <section id="fonctionnement" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trouvez et réservez vos médicaments en 3 étapes simples
            </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <div key={index} className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition duration-300">
                    <div className="w-16 h-16 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-6">
                    {step.icon}
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
}

export default HowItWorks


