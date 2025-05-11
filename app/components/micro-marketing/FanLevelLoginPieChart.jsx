import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FanLevelLoginPieChart = ({ data }) => {
  // Process the data to get average Week_Logins by Fan_Level
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by Fan_Level and calculate average Week_Logins
    const groupedData = data.reduce((acc, item) => {
      const fanLevel = item.Fan_Level || 'Unknown';
      const weekLogins = parseFloat(item.Week_Logins) || 0;

      if (!acc[fanLevel]) {
        acc[fanLevel] = { 
          fanLevel, 
          totalLogins: 0,
          count: 0
        };
      }
      
      acc[fanLevel].totalLogins += weekLogins;
      acc[fanLevel].count += 1;
      
      return acc;
    }, {});

    // Convert to array and calculate averages
    return Object.values(groupedData).map(group => ({
      name: group.fanLevel,
      value: group.count > 0 ? +(group.totalLogins / group.count).toFixed(2) : 0
    }));
  }, [data]);

  // Colors for pie chart sections
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];

  // Custom tooltip to match the theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-blue-400">
            Avg. Logins: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Average Weekly Logins by Fan Level</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value) => <span className="text-white">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FanLevelLoginPieChart;