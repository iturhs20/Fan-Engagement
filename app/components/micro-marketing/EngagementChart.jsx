// components/EngagementChart.js
'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const filtersList = {
  City: '',
  Gender: '',
  Sport: '',
  Engagement: '',
  Logs: ''
};

export default function EngagementChart() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(filtersList);

  useEffect(() => {
    Papa.parse('/micromarket2.csv', {
      download: true,
      header: true,
      complete: function (results) {
        setData(results.data);
      }
    });
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value === 'All' ? '' : value }));
  };

  const handleSelectAll = (field) => {
    setFilters((prev) => ({ ...prev, [field]: '' }));
  };

  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      return value === '' || row[key] === value;
    });
  });

  // Group by Age and calculate average TimeSpent
  const ageGroups = {};
  filteredData.forEach((row) => {
    const age = row.Age;
    const timeSpent = parseInt(row.TimeSpent);
    if (!isNaN(age) && !isNaN(timeSpent)) {
      if (!ageGroups[age]) {
        ageGroups[age] = [];
      }
      ageGroups[age].push(timeSpent);
    }
  });

  const chartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Avg TimeSpent by Age',
        data: Object.values(ageGroups).map((times) =>
          (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)
        ),
        backgroundColor: 'rgba(99, 102, 241, 0.7)', // indigo color to match Part1Chart
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(139, 92, 246, 0.85)', // purple like Part1Chart point color
      }
    ]
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
            return `Age: ${context[0].label}`;
          },
          label: (context) => {
            return `Avg Time Spent: ${context.raw}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Average Time Spent by Age Group',
        color: 'white',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
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
          }
        },
        title: {
          display: true,
          text: 'Age',
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
          text: 'Average Time Spent',
          color: 'white',
          padding: {
            bottom: 10
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  // Render filter section similar to Part1Filters
  const renderFilterSection = (field) => {
    return (
      <div className="bg-gray-800 rounded-lg p-3 md:p-4 flex-1 shadow-lg">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm md:text-base lg:text-lg font-medium">{field}</h3>
          <button 
            className="text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => handleSelectAll(field)}
          >
            Select All
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-1 md:p-2 border border-gray-700">
          <select 
            className="w-full bg-gray-900 text-white border-none text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onChange={(e) => handleFilterChange(field, e.target.value)}
            value={filters[field] || ''}
          >
            <option value="">All</option>
            {[...new Set(data.map((row) => row[field]))]
              .filter(Boolean)
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-4">
      {/* Filters styled like Part1Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-4">
        {Object.keys(filtersList).slice(0, 3).map((field) => renderFilterSection(field))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:gap-4 mb-6">
        {Object.keys(filtersList).slice(3).map((field) => renderFilterSection(field))}
      </div>

      {/* Bar Chart with consistent styling to Part1Chart */}
      <div className="mt-8 bg-gray-900 rounded-lg p-4">
        <h3 className="text-xl font-medium mb-4">Time Spent Analysis by Age</h3>
        <div className="w-full h-full min-h-64 md:min-h-80 lg:min-h-96 relative">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}