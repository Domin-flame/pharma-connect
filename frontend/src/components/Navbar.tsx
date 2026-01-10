import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';



// Composant Navbar
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    (isActive ? 'text-emerald-600 font-semibold' : 'text-gray-700 hover:text-emerald-600') +
    ' transition-colors';


  const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Pharmacies', path: '/pharmacies' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <Logo textClassName="text-gray-900 text-lg font-bold" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-md"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;