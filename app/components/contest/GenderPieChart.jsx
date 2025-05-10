import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#ff6384', '#36a2eb'];

const GenderPieChart = ({ data }) => {
  const counts = data.reduce((acc, row) => {
    acc[row.Gender] = (acc[row.Gender] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([key, val]) => ({
    name: key,
    value: val,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Gender Distribution</h3>
      <PieChart width={300} height={250}>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GenderPieChart;
