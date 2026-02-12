import DashboardHeader from '../components/DashboardHeader';
import MetricsCard from '../components/MetricsCard';
import ReportsSection from '../components/ReportsSection';
import NavigationBar from '../components/NavigationBar';

const Dashboard = () => {
  const username = 'biseseta';
  const metrics = [
    { title: 'Total Eco-Points', value: 0, icon: '🏆' },
    { title: 'Total Reports', value: 0, icon: '📷' },
    { title: 'Verified', value: 0, icon: '✅' },
    { title: 'Pending', value: 0, icon: '⏱️' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavigationBar />
      <DashboardHeader username={username} />
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-4 gap-6">
          {metrics.map((m) => (
            <MetricsCard key={m.title} title={m.title} value={m.value} icon={m.icon} />
          ))}
        </div>
      </div>
      <ReportsSection reports={[]} />
    </div>
  );
};

export default Dashboard;