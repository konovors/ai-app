import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.email) {
          setUser(data);
        } else {
          navigate('/login');
        }
      })
      .catch(() => {
        setUser(null);
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || 'Nema odgovora.');
    } catch (err) {
      setResponse('Greška u mreži');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      {user ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="fw-bold">Ulogovani korisnik: {user.email}</span>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Unesi pitanje za AI"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Čekaj...' : 'Pošalji'}
              </button>
            </div>
          </form>

          <div>
            <h5>AI Odgovor:</h5>
            <div className="alert alert-secondary" role="alert">
              {isLoading ? '⏳ AI razmišlja...' : response || 'Nema odgovora.'}
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">Učitavanje korisnika...</div>
      )}
    </div>
  );
}

export default Dashboard;
