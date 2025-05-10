import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeSpentBarChart = ({ data }) => {
  const result = {};
  data.forEach(row => {
    if (!row.Contest_ID) return;
    result[row.Contest_ID] = (result[row.Contest_ID] || 0) + Math.round(parseFloat(row.Time_Spent_Hours || 0));
  });

  const chartData = Object.entries(result).map(([key, val]) => ({ name: key, value: val }));

  return (
    <div className="bg-gray-900 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Sum of Time Spent by Contest (in Hours)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: '#ffffff' }} />
          <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }}/>
          <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: 'none' }}
            labelStyle={{ color: '#000000' }}/>
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSpentBarChart;
