// ✅ CompanyProfileEdit.jsx za prikaz i izmenu profila
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfileEdit = () => {
    const user = localStorage.getItem('user');
    const userId = user?.userId || localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    location: '',
    targetAudience: '',
    communicationTone: '',
    website: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: '',
    services: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 🔁 Učitavanje postojećeg profila
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.warn('⛔ Nevalidan userId za profil:', userId);
        setError('ID korisnika nije validan.');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5002/api/profile/${userId}`);
        if (res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.warn('⚠️ Profil nije pronađen:', err.response?.data || err.message);
        setError('Profil kompanije nije pronađen.');
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5002/api/profile/save', {
        userId,
        ...formData,
      });
      setMessage('✅ Profil uspešno ažuriran!');
    } catch (err) {
      console.error('❌ Greška pri čuvanju:', err);
      setError('Greška pri snimanju profila.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h3 className="mb-4">🛠 Uredi profil kompanije</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-warning">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Naziv firme</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Industrija</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Lokacija / tržište</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Ciljna publika</label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Ton komunikacije</label>
            <select
              name="communicationTone"
              value={formData.communicationTone}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Odaberi --</option>
              <option value="formalno">Formalno</option>
              <option value="opušteno">Opušteno</option>
              <option value="tehnički">Tehnički</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Ključne usluge</label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Web sajt</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">TikTok</label>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          💾 Sačuvaj izmene
        </button>
      </form>
    </div>
  );
};

export default CompanyProfileEdit;
