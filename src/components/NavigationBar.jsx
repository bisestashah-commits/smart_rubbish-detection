import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white rounded-lg p-2 text-xl">♻️</div>
            <span className="text-xl font-bold">Smart Rubbish</span>
          </div>
          <ul className="flex gap-8 text-gray-700 font-medium">
            <li><a href="/dashboard" className="text-gray-900 font-semibold">Dashboard</a></li>
            <li><a href="/report" className="hover:text-gray-900">Report Rubbish</a></li>
            <li><a href="/leaderboard" className="hover:text-gray-900">Leaderboard</a></li>
            <li><a href="/awareness" className="hover:text-gray-900">Awareness</a></li>
            <li><a href="/heatmap" className="hover:text-gray-900">Heat Map</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <span>♻️</span>
            <span>0 Points</span>
          </div>
          <button className="text-gray-600 hover:text-gray-900 text-xl">🔔</button>
          <button className="text-gray-600 hover:text-gray-900 text-xl">👤</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
