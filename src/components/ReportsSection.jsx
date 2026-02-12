const ReportsSection = ({ reports }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Recent Reports</h2>
        <p className="text-gray-600 mb-8">View the status of your submitted rubbish reports</p>
        
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4 opacity-20">📷</div>
            <p className="text-gray-600 text-lg mb-6">You haven't submitted any reports yet</p>
            <p className="text-gray-500 text-sm mb-8">Do not sell or share my personal info</p>
            <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
              Report Rubbish Now
            </button>
          </div>
        ) : (
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.id} className="border-t border-gray-200 py-4 first:border-t-0 first:pt-0">
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{report.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsSection;
