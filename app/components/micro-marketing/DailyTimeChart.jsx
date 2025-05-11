import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyTimeChart = ({ filteredData }) => {
  const grouped = {};

  filteredData.forEach(row => {
    const date = row.Date;
    const timeSpent = parseFloat(row.Daily_Time_Spent_Hours);
    if (!isNaN(timeSpent)) {
      if (!grouped[date]) grouped[date] = 0;
      grouped[date] += timeSpent;
    }
  });

  const dates = Object.keys(grouped).sort();
  const timeValues = dates.map(date => grouped[date].toFixed(2));

  const chartData = {
    labels: dates,
    datasets: [{
      label: 'Sum of Daily Time Spent (Hours)',
      data: timeValues,
      backgroundColor: '#8b5cf6', // purple-500
      borderColor: '#6366f1', // indigo-500
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: '#a78bfa', // purple-400
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          },
          boxWidth: 15,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900 with opacity
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#4f46e5', // indigo-600
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        caretSize: 6,
        callbacks: {
          title: (context) => {
            return `Date: ${context[0].label}`;
          },
          label: (context) => {
            return `Hours: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)', // gray-400 with low opacity
          tickLength: 8,
          drawBorder: true,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 12
        },
        title: {
          display: true,
          text: 'Date',
          color: 'white',
          padding: {
            top: 10
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)', // gray-400 with low opacity
          drawBorder: true,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 10
          },
          padding: 5
        },
        title: {
          display: true,
          text: 'Hours',
          color: 'white',
          padding: {
            bottom: 10
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="w-full h-full min-h-64 md:min-h-80 lg:min-h-96 relative">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyTimeChart;