import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Part1Chart = ({ filteredData }) => {
  const grouped = {};

  filteredData.forEach(row => {
    const date = row.Date;
    const index = parseFloat(row.Fan_Level_Index1);
    if (!isNaN(index)) {
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(index);
    }
  });

  const dates = Object.keys(grouped).sort();
  const averages = dates.map(date => {
    const sum = grouped[date].reduce((a, b) => a + b, 0);
    return (sum / grouped[date].length).toFixed(2);
  });

  const chartData = {
    labels: dates,
    datasets: [{
      label: 'Avg Fan Level Index',
      data: averages,
      fill: false,
      borderColor: '#3b82f6', // blue-500
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.1,
      pointBackgroundColor: '#3b82f6',
      pointRadius: 4,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the legend
      },
      tooltip: {
        backgroundColor: '#1f2937', // gray-800
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#4b5563', // gray-600
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Part1Chart;