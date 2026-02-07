import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.response?.data?.detail || 'Erreur lors de l’inscription. Veuillez vérifier vos informations.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="auth-card glass text-center">
                    <div className="success-icon"><CheckCircle2 size={64} /></div>
                    <h2>Inscription réussie !</h2>
                    <p>Redirection vers la page de connexion...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card glass"
            >
                <div className="auth-header">
                    <div className="auth-icon"><UserPlus size={32} /></div>
                    <h2>Créer un compte</h2>
                    <p>Rejoignez la communauté PharmaConnect</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="input-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Type de compte</label>
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-option ${formData.role === 'CLIENT' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, role: 'CLIENT' })}
                            >
                                <User size={24} />
                                <span>Client</span>
                            </button>
                            <button
                                type="button"
                                className={`role-option ${formData.role === 'PHARMACY' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, role: 'PHARMACY' })}
                            >
                                <Building size={24} />
                                <span>Pharmacie</span>
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading ? 'Inscription...' : "S'inscrire"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
                </div>
            </motion.div>

            <style>{`
        .success-icon {
          color: var(--primary);
          margin-bottom: 20px;
        }
        .text-center {
          text-align: center;
        }
        
        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .role-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .role-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 206, 138, 0.5);
        }
        
        .role-option.active {
          background: rgba(0, 206, 138, 0.15);
          border-color: rgba(0, 206, 138, 0.8);
          color: #00ce8a;
        }
        
        .role-option span {
          font-weight: 600;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
};

export default Register;
