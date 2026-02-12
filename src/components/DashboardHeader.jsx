const DashboardHeader = ({ username }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {username}!</h1>
      <p className="text-lg text-gray-600">Track your environmental impact and earn rewards</p>
    </div>
  );
};

export default DashboardHeader;
