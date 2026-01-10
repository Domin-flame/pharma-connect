import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo textClassName="text-white" />
            </div>
            <p className="text-gray-400">
              Votre solution pour trouver et réserver vos médicaments facilement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#accueil" className="text-gray-400 hover:text-white transition">Accueil</a></li>
              <li><a href="#fonctionnement" className="text-gray-400 hover:text-white transition">Comment ça marche</a></li>
              <li><a href="#pharmacies" className="text-gray-400 hover:text-white transition">Pharmacies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Aide</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@pharmaconnect.cm</li>
              <li>Tél: +237 6 XX XX XX XX</li>
              <li>Yaounde, Cameroun</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PharmaConnect - Cameroun. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer