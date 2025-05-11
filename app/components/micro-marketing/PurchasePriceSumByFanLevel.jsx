import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PurchasePriceSumByFanLevel = ({ data }) => {
  // Process the data to get sum of Purchase_Price by Fan_Level
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by Fan_Level and sum Purchase_Price
    const groupedData = data.reduce((acc, item) => {
      const fanLevel = item.Fan_Level || 'Unknown';
      const purchasePrice = parseFloat(item.Purchase_Price) || 0;

      if (!acc[fanLevel]) {
        acc[fanLevel] = { 
          fanLevel, 
          totalSpent: 0 
        };
      }
      
      acc[fanLevel].totalSpent += purchasePrice;
      return acc;
    }, {});

    // Convert to array and sort by fan level
    return Object.values(groupedData)
      .sort((a, b) => {
        // Extract fan level numbers for sorting if possible
        const levelA = a.fanLevel.replace('Level ', '');
        const levelB = b.fanLevel.replace('Level ', '');
        
        // Try to sort numerically if levels are numbers
        const numA = parseInt(levelA, 10);
        const numB = parseInt(levelB, 10);
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
        
        // Otherwise sort alphabetically
        return a.fanLevel.localeCompare(b.fanLevel);
      })
      .map(item => ({
        ...item,
        totalSpent: parseFloat(item.totalSpent.toFixed(2))
      }));
  }, [data]);

  // Format currency values
  const formatCurrency = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${value}`;
  };

  // Custom tooltip to match the theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="text-white font-medium">{payload[0].payload.fanLevel}</p>
          <p className="text-green-400">
            Total Spent: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Total Purchase Value by Fan Level</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="fanLevel" 
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
              tickFormatter={formatCurrency}
              label={{ 
                value: 'Total Purchase Value', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#94a3b8',
                dx: -15,
                dy: 60
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              formatter={() => <span className="text-white">Purchase Value</span>}
            />
            <Bar 
              dataKey="totalSpent" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchasePriceSumByFanLevel;