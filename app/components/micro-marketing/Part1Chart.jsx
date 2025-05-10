import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
      fill: true,
      borderColor: '#6366f1', // indigo-500
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      tension: 0.4,
      pointBackgroundColor: '#8b5cf6', // purple-500
      pointBorderColor: '#ffffff',
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
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
            return `Index: ${context.raw}`;
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
          text: 'Fan Level Index',
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Part1Chart;