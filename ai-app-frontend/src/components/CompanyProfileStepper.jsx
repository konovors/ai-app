// ✅ CompanyProfileStepper.jsx sa automatskim učitavanjem profila
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfileStepper = ({ userId }) => {
  const [step, setStep] = useState(1);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔁 Učitavanje profila ako postoji
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/profile/${userId}`);
        if (res.data) {
          console.log('✅ Učitani podaci:', res.data);
          setFormData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.warn('⚠️ Nema postojećeg profila ili greška pri čitanju:', err.response?.data || err.message);
        setError('Profil kompanije nije pronađen.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5002/api/profile/save', {
        userId,
        ...formData,
      });
      alert('✅ Profil kompanije sačuvan!');
      console.log(res.data);
    } catch (err) {
      console.error('❌ Greška pri snimanju:', err);
      alert('Greška pri snimanju profila kompanije.');
    }
  };

  if (loading) return <p>⏳ Učitavanje profila...</p>;

  return (
    <div className="card shadow-sm p-4 bg-white rounded">
      <h3 className="mb-4 fw-bold">{step === 1 ? '📌 Osnovni podaci' : step === 2 ? '🧭 Publika i ton' : '🌐 Online prisustvo'}</h3>

      {error && <div className="alert alert-warning">{error}</div>}

      {step === 1 && (
        <>
          <div className="mb-3">
            <label className="form-label">Naziv firme</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Industrija</label>
            <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="form-control" />
          </div>
          <div className="d-flex justify-content-end">
            <button onClick={nextStep} className="btn btn-primary">Sledeći →</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-3">
            <label className="form-label">Lokacija / tržište</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Ciljna publika</label>
            <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Ton komunikacije</label>
            <select name="communicationTone" value={formData.communicationTone} onChange={handleChange} className="form-select">
              <option value="">-- Odaberi --</option>
              <option value="formalno">Formalno</option>
              <option value="opušteno">Opušteno</option>
              <option value="tehnički">Tehnički</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={prevStep} className="btn btn-secondary">← Nazad</button>
            <button onClick={nextStep} className="btn btn-primary">Sledeći →</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mb-3">
            <label className="form-label">Web sajt</label>
            <input type="text" name="website" value={formData.website} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Facebook</label>
            <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Instagram</label>
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">TikTok</label>
            <input type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">LinkedIn</label>
            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Ključne usluge</label>
            <input type="text" name="services" value={formData.services} onChange={handleChange} className="form-control" />
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={prevStep} className="btn btn-secondary">← Nazad</button>
            <button onClick={handleSubmit} className="btn btn-success">✅ Sačuvaj</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyProfileStepper;
