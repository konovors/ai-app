import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import CompanyProfileEdit from './pages/CompanyProfileEdit';
import SEOExpert from './pages/SEOExpert'; // ✅ dodat import

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-3">
      {/* Bootstrap navigacija */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mb-4 px-3">
        <Link className="navbar-brand fw-bold" to="/">
          AI App
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/company-edit">
                    Company
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/seo-expert">
                    SEO Expert
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Rute */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-edit" element={<CompanyProfileEdit />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/seo-expert"
          element={
            <PrivateRoute>
              <SEOExpert />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
