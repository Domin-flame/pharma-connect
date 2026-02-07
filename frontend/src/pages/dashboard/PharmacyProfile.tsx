import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building, Save, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { pharmacyService } from "../../services/api";
import { Pharmacy } from "../../types";

export default function PharmacyProfile() {
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    latitude: "",
    longitude: "",
  });

  // Fetch pharmacy data on mount
  useEffect(() => {
    fetchPharmacyData();
  }, []);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await pharmacyService.getMyPharmacy();
      
      if (response.data && response.data.length > 0) {
        const pharmacyData = response.data[0];
        setPharmacy(pharmacyData);
        setForm({
          name: pharmacyData.name || "",
          address: pharmacyData.address || "",
          city: pharmacyData.city || "",
          email: pharmacyData.email || "",
          phone: pharmacyData.phone || "",
          latitude: pharmacyData.latitude?.toString() || "",
          longitude: pharmacyData.longitude?.toString() || "",
        });
      } else {
        setError("Aucune pharmacie trouvée. Veuillez créer votre profil.");
      }
    } catch (err: any) {
      console.error("Error fetching pharmacy:", err);
      setError(err.response?.data?.detail || "Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);

    try {
      const dataToSend = {
        name: form.name,
        address: form.address,
        city: form.city,
        email: form.email || null,
        phone: form.phone || null,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
      };

      if (pharmacy?.id) {
        // Update existing pharmacy
        await pharmacyService.patchPharmacy(pharmacy.id, dataToSend);
        setSuccess(true);
        await fetchPharmacyData();
        
        setTimeout(() => setSuccess(false), 3000);
      } else {
        // Create new pharmacy
        await pharmacyService.createPharmacy(dataToSend);
        setSuccess(true);
        await fetchPharmacyData();
        
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error("Error saving pharmacy:", err);
      setError(err.response?.data?.detail || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Chargement du profil...</p>
        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 100px 20px;
            color: rgba(255, 255, 255, 0.7);
            gap: 16px;
          }
          
          .spinner {
            animation: spin 1s linear infinite;
            color: #00ce8a;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-header"
      >
        <h1>Profil de la Pharmacie</h1>
        <p>Gérez les informations de votre pharmacie</p>
      </motion.div>

      {/* Status Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="message-box error-box"
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="message-box success-box"
        >
          <CheckCircle size={20} />
          <span>Profil enregistré avec succès!</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="profile-card"
      >
        {/* Header with Avatar */}
        <div className="card-header">
          <div className="avatar">
            {form.name ? form.name.charAt(0).toUpperCase() : "P"}
          </div>
          <div className="header-info">
            <h2>{form.name || "Nouvelle Pharmacie"}</h2>
            <p>{form.city || "Ville non spécifiée"}</p>
            {pharmacy?.status && (
              <span className={`status-badge ${pharmacy.status.toLowerCase()}`}>
                {pharmacy.status === 'APPROVED' ? 'Approuvé' : 
                 pharmacy.status === 'PENDING' ? 'En attente' : 'Rejeté'}
              </span>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <Building size={16} />
                Nom de la pharmacie *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex: Pharmacie Centrale"
              />
            </div>

            <div className="form-group">
              <label>
                <MapPin size={16} />
                Ville *
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="Ex: Yaoundé"
              />
            </div>

            <div className="form-group full-width">
              <label>
                <MapPin size={16} />
                Adresse complète *
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Ex: Avenue Kennedy, Quartier Essos"
              />
            </div>

            <div className="form-group">
              <label>
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contact@pharmacie.cm"
              />
            </div>

            <div className="form-group">
              <label>
                <Phone size={16} />
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+237 6XX XX XX XX"
              />
            </div>

            <div className="form-group">
              <label>
                <MapPin size={16} />
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Ex: 3.8480"
              />
            </div>

            <div className="form-group">
              <label>
                <MapPin size={16} />
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Ex: 11.5021"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={saving}
              className="btn-save"
            >
              {saving ? (
                <>
                  <Loader className="btn-spinner" size={18} />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <style>{`
        .profile-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .profile-header {
          margin-bottom: 10px;
        }

        .profile-header h1 {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
        }

        .profile-header p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .message-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 10px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .error-box {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .success-box {
          background: rgba(0, 206, 138, 0.15);
          border: 1px solid rgba(0, 206, 138, 0.3);
          color: #6ee7b7;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 32px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ce8a, #00ecc0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(0, 206, 138, 0.3);
        }

        .header-info {
          flex: 1;
        }

        .header-info h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 4px;
        }

        .header-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .status-badge {
          display: inline-block;
          margin-top: 8px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.approved {
          background: rgba(0, 206, 138, 0.2);
          color: #6ee7b7;
        }

        .status-badge.pending {
          background: rgba(251, 191, 36, 0.2);
          color: #fcd34d;
        }

        .status-badge.rejected {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(0, 206, 138, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-save {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #00ce8a, #00ecc0);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-save:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 206, 138, 0.4);
        }

        .btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .profile-card {
            padding: 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
          }

          .avatar {
            width: 70px;
            height: 70px;
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
