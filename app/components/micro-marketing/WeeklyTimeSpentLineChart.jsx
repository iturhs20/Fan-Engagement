import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyTimeSpentLineChart = ({ data }) => {
  // Process the data to get sum of Week_Time_Spent_Hours by Week
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by Week and calculate sum of Week_Time_Spent_Hours
    const groupedData = data.reduce((acc, item) => {
      const week = item.Week || 'Unknown';
      const timeSpent = parseFloat(item.Week_Time_Spent_Hours) || 0;

      if (!acc[week]) {
        acc[week] = { 
          week,
          totalHours: 0
        };
      }
      
      acc[week].totalHours += timeSpent;
      return acc;
    }, {});

    // Convert to array and sort by week number
    return Object.values(groupedData)
      .sort((a, b) => {
        // Extract week numbers for sorting
        const weekNumA = parseInt(a.week.replace('Week ', ''), 10) || 0;
        const weekNumB = parseInt(b.week.replace('Week ', ''), 10) || 0;
        return weekNumA - weekNumB;
      })
      .map(group => ({
        name: group.week,
        hours: parseFloat(group.totalHours.toFixed(2))
      }));
  }, [data]);

  // Format large numbers with K suffix
  const formatValue = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value;
  };

  // Custom tooltip to match the theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-green-400">
            {payload[0].value} hours
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Total Time Spent by Week</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
              tickFormatter={formatValue}
              label={{ 
                value: 'Hours Spent', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#94a3b8',
                dx: -15
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              formatter={(value) => <span className="text-white">Total Hours</span>}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 4, fill: "#10b981", stroke: "#064e3b", strokeWidth: 1 }}
              activeDot={{ r: 6, fill: "#10b981", stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTimeSpentLineChart;