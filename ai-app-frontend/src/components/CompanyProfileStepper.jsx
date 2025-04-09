import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
        console.log('✅ Šaljem profil:', {
            userId,
            ...formData
          });
          
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

  return (
    <div className="card shadow-sm p-4 bg-white rounded">
      <h5 className="mb-4 fw-bold">1. Korak – Osnovni podaci o kompaniji</h5>
      <p className="text-muted mb-4">Pomozi nam da te što bolje upoznamo.</p>

      <div className="mb-3">
        <label className="form-label">Naziv kompanije</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="form-control"
          placeholder="npr. Webstudio Digital"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Industrija</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="form-control"
          placeholder="npr. Marketing, IT, Proizvodnja..."
        />
      </div>

      <div className="d-flex justify-content-end">
        <button onClick={nextStep} className="btn btn-outline-primary">
          Sledeći korak →
        </button>
      </div>

      {step > 1 && (
        <div className="mt-5 text-muted">
           </div>
      )}
      {step === 2 && (
  <>
    <h5 className="mb-4 fw-bold">2. Korak – Publika i komunikacija</h5>

    <div className="mb-3">
      <label className="form-label">Lokacija / Tržište</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="form-control"
        placeholder="npr. Srbija, EU, US"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Ciljna publika</label>
      <input
        type="text"
        name="targetAudience"
        value={formData.targetAudience}
        onChange={handleChange}
        className="form-control"
        placeholder="npr. mala preduzeća, IT menadžeri..."
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Ton komunikacije</label>
      <select
        className="form-select"
        name="communicationTone"
        value={formData.communicationTone}
        onChange={handleChange}
      >
        <option value="">-- Odaberi ton --</option>
        <option value="formalno">Formalno</option>
        <option value="opušteno">Opušteno</option>
        <option value="tehnički">Tehnički</option>
      </select>
    </div>

    <div className="d-flex justify-content-between">
      <button onClick={() => setStep(1)} className="btn btn-outline-secondary">
        ← Nazad
      </button>
      <button onClick={() => setStep(3)} className="btn btn-outline-primary">
        Sledeći korak →
      </button>
    </div>
    
  </>
)}
{step === 3 && (
  <>
    <h5 className="mb-4 fw-bold">3. Korak – Online prisustvo i usluge</h5>

    <div className="mb-3">
      <label className="form-label">Web sajt</label>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="form-control"
        placeholder="https://mojakompanija.rs"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Facebook</label>
      <input
        type="text"
        name="facebook"
        value={formData.facebook}
        onChange={handleChange}
        className="form-control"
        placeholder="https://facebook.com/..."
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Instagram</label>
      <input
        type="text"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        className="form-control"
        placeholder="https://instagram.com/..."
      />
    </div>

    <div className="mb-3">
      <label className="form-label">TikTok</label>
      <input
        type="text"
        name="tiktok"
        value={formData.tiktok}
        onChange={handleChange}
        className="form-control"
        placeholder="https://tiktok.com/@..."
      />
    </div>

    <div className="mb-3">
      <label className="form-label">LinkedIn</label>
      <input
        type="text"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleChange}
        className="form-control"
        placeholder="https://linkedin.com/company/..."
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Ključne usluge / proizvodi</label>
      <textarea
        name="services"
        value={formData.services}
        onChange={handleChange}
        className="form-control"
        placeholder="npr. SEO, web dizajn, e-commerce"
        rows={3}
      />
    </div>

    <div className="d-flex justify-content-between">
      <button onClick={() => setStep(2)} className="btn btn-outline-secondary">
        ← Nazad
      </button>
      <button onClick={handleSubmit} className="btn btn-success">
        ✅ Sačuvaj profil
      </button>
    </div>
  </>
)}


    </div>
  );
};

export default CompanyProfileStepper;
