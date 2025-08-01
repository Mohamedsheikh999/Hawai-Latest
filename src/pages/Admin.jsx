import AnalyticsChart from '../components/Dashboard/AnalyticsChart';

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-light-green min-h-screen">
      <h1 className="text-3xl font-bold text-dark-green mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalyticsChart />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-dark-green mb-4">Quick Stats</h2>
          <p>Total Users: 1,200</p>
          <p>Active Exams: 15</p>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;