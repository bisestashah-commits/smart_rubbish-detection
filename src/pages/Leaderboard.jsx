import React, { useState, useEffect } from 'react';
import { TrendingUp, Trophy } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import NavigationBar from '../components/NavigationBar';

const Leaderboard = () => {
  const { user } = React.useContext(AuthContext);
  const [userRank, setUserRank] = useState(null);
  const [topContributors, setTopContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, [user]);

  const fetchLeaderboardData = () => {
    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Get user reports/eco-points from localStorage (or use mock data)
    const userPoints = JSON.parse(localStorage.getItem('userPoints')) || {};
    
    // Create leaderboard data
    const leaderboardData = allUsers
      .map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        points: userPoints[u.email] || Math.floor(Math.random() * 1000),
        badge: userPoints[u.email] > 500 ? 'Champion' : 'Contributor',
        isCurrent: user?.email === u.email,
      }))
      .sort((a, b) => b.points - a.points);

    // Find current user rank
    const currentUserRank = leaderboardData.find((u) => u.isCurrent);
    if (currentUserRank) {
      setUserRank({
        rank: leaderboardData.indexOf(currentUserRank) + 1,
        points: currentUserRank.points,
        badge: currentUserRank.badge,
      });
    }

    setTopContributors(leaderboardData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-500">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">Top environmental champions making a difference</p>
        </div>

        {/* Your Rank Section */}
        {userRank && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp className="text-green-600" size={32} />
                <div>
                  <p className="text-gray-600 text-sm">Your Rank</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-bold text-gray-900">#{userRank.rank}</h2>
                    <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {userRank.badge}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Your Points</p>
                <p className="text-4xl font-bold text-green-600">{userRank.points}</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Contributors Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Top Contributors</h3>
            <p className="text-gray-600 text-sm">Users ranked by eco-points earned from verified reports</p>
          </div>

          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <div
                key={contributor.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  index === 0
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-center w-10 h-10">
                    {index === 0 && <Trophy className="text-yellow-500" size={28} />}
                    {index === 1 && <Trophy className="text-gray-400" size={28} />}
                    {index === 2 && <Trophy className="text-orange-600" size={28} />}
                    {index > 2 && (
                      <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{contributor.name}</h4>
                      {contributor.isCurrent && (
                        <span className="text-xs text-gray-600">(You)</span>
                      )}
                      {contributor.badge && (
                        <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold">
                          ⭐ {contributor.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contributor.email}</p>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{contributor.points}</p>
                  <p className="text-xs text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>

          {topContributors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No contributors yet. Start reporting rubbish to earn eco-points!
            </div>
          )}
        </div>

        {/* How to Earn Eco-Points Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Earn Eco-Points</h3>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span className="text-gray-700">Report rubbish with photo and location to earn points</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span className="text-gray-700">Each verified report earns you 10 eco-points</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span className="text-gray-700">Reports must be verified by an admin to award points</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span className="text-gray-700">Climb the leaderboard and become an environmental champion!</span>
            </li>
          </ul>

          {/* Privacy Checkbox */}
          <div className="border-t pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-500">Do not sell or share my personal info</span>
            </label>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Leaderboard;
