import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    <Package size={28} />
                    <span>PharmaConnect</span>
                </Link>

                <ul className="nav-links">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/search">Rechercher</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/orders">Mes Commandes</Link></li>
                            <li>
                                <button onClick={handleLogout} className="btn-logout" aria-label="Déconnexion">
                                    <LogOut size={20} />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Connexion</Link></li>
                            <li>
                                <Link to="/register" className="btn btn-primary">S'inscrire</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
