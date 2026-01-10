
type Props = {
  onLogin?: () => void;
  onRegister?: () => void;
  stacked?: boolean;
  className?: string;
};

const AuthButtons = ({ onLogin, onRegister, stacked = false, className = '' }: Props) => {
  if (stacked) {
    return (
      <>
        <button
          onClick={onLogin}
          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-md"
        >
          Connexion
        </button>
        <button
          onClick={onRegister}
          className="w-full bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700"
        >
          Inscription
        </button>
      </>
    );
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <button
        onClick={onLogin}
        className="text-gray-700 hover:text-emerald-600 font-medium transition"
      >
        Connexion
      </button>
      <button
        onClick={onRegister}
        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
      >
        Inscription
      </button>
    </div>
  );
};

export default AuthButtons;
