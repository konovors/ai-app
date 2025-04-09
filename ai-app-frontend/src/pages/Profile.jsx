import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyProfileStepper from '../components/CompanyProfileStepper';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId || localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.put(
        `http://localhost:5002/api/users/${userId}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('✅ Profil ažuriran:', res.data);

      setMessage(res.data.message || 'Profil uspešno ažuriran.');

      const updatedUser = {
        ...user,
        name: res.data.name,
        email: res.data.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err.response?.data?.message || 'Greška pri ažuriranju profila.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">👤 Profil korisnika</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ime</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email adresa</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nova lozinka (opciono)</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sačuvaj izmene
        </button>
      </form>

      <hr className="my-5" />
      <h4 className="mb-3">🧾 Profil tvoje kompanije</h4>

      <CompanyProfileStepper userId={userId} />
    </div>
  );
};

export default Profile;
