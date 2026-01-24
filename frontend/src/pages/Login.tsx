import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({ username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Identifiants invalides. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card glass"
      >
        <div className="auth-header">
          <div className="auth-icon"><LogIn size={32} /></div>
          <h2>Connexion</h2>
          <p>Heureux de vous revoir !</p>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="votre_nom"
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </motion.div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 130px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at top right, rgba(0, 206, 138, 0.05), transparent),
                      radial-gradient(circle at bottom left, rgba(26, 43, 75, 0.05), transparent);
        }

        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 40px;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-header h2 {
          font-size: 2rem;
          margin: 15px 0 5px;
        }

        .auth-header p {
          color: var(--text-muted);
        }

        .auth-icon {
          width: 64px;
          height: 64px;
          background: rgba(0, 206, 138, 0.1);
          color: var(--primary);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--secondary);
        }

        .btn-full {
          width: 100%;
          justify-content: center;
          padding: 14px;
          margin-top: 10px;
          font-size: 1.1rem;
        }

        .auth-footer {
          margin-top: 25px;
          text-align: center;
          font-size: 0.95rem;
        }

        .auth-footer a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-error {
          background: rgba(255, 107, 107, 0.1);
          color: var(--accent);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
