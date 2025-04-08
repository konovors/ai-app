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
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Ulogovani korisnik: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Unesi pitanje za AI"
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Čekaj...' : 'Pošalji'}
            </button>
          </form>

          <h3>AI Odgovor:</h3>
          {isLoading ? (
            <p>⏳ AI razmišlja...</p>
          ) : (
            <p>{response}</p>
          )}
        </>
      ) : (
        <p>Učitavanje korisnika...</p>
      )}
    </div>
  );
}

export default Dashboard;
