import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import PharmacyDetail from './pages/PharmacyDetail';
import Orders from './pages/Orders';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </main>
                <footer className="footer">
                    <p>&copy; 2026 PharmaConnect. Tous droits réservés.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
