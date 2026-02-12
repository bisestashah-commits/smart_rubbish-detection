const MetricsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-gray-600 text-sm font-medium mb-4">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold text-gray-900">{value}</p>
        <span className="text-5xl">{icon}</span>
      </div>
    </div>
  );
};

export default MetricsCard;
