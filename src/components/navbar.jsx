import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            ♻
          </div>
          <h1 className="text-xl font-bold">Smart Rubbish Detection</h1>
        </div>

        <div className="flex gap-6 items-center">
          <a href="/dashboard" className="text-gray-700 hover:text-green-600">
            Dashboard
          </a>
          <a href="/heatmap" className="text-gray-700 hover:text-green-600">
            Heat Map
          </a>
          <a href="/report" className="text-gray-700 hover:text-green-600">
            Report
          </a>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
