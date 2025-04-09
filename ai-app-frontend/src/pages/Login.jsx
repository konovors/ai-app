import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Uspešna prijava!');
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.error || 'Greška');
      }
    } catch (err) {
      setMessage('Greška u mreži');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Prijava</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email adresa</label>
            <input
              type="email"
              className="form-control"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Lozinka</label>
            <input
              type="password"
              className="form-control"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Prijavi se
          </button>
        </form>
        {message && (
          <div className="alert alert-danger mt-3 mb-0 py-2 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
