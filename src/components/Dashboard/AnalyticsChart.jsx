import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsChart = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Exam Purchases',
      data: [12, 19, 8, 15, 22],
      backgroundColor: '#2E7D32',
    }]
  };

  const pieData = {
    labels: ['Mathematics', 'Biology', 'Physics', 'Chemistry'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: ['#2E7D32', '#4CAF50', '#81C784', '#A5D6A7'],
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Monthly Sales</h3>
        <Bar data={barData} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Subject Distribution</h3>
        <div className="h-64">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;