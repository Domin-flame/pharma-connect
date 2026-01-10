import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(): React.ReactElement {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError('Veuillez renseigner l\'email et le mot de passe.');
            return;
        }

        setLoading(true);
        // simple mock auth: accept any non-empty credentials
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 500);
    };

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
                <p className="text-gray-600 mb-8">Connectez-vous à votre compte</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-60"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600"> Pas encore de compte ?{' '}
                        <button onClick={() => navigate('/register')} className="text-emerald-600 hover:underline font-medium"> S'inscrire </button>
                    </p>
                </div>
            </div>
        </div>
    );
}




 






