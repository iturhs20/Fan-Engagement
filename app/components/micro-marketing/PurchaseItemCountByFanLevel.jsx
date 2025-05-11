import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PurchaseItemCountByFanLevel = ({ data }) => {
  // Process the data to get count of Purchase_Item by Fan_Level
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by Fan_Level and count Purchase_Items
    const groupedData = data.reduce((acc, item) => {
      const fanLevel = item.Fan_Level || 'Unknown';
      const hasPurchase = item.Purchase_Item && item.Purchase_Item !== 'None' ? 1 : 0;

      if (!acc[fanLevel]) {
        acc[fanLevel] = { 
          fanLevel, 
          purchaseCount: 0 
        };
      }
      
      acc[fanLevel].purchaseCount += hasPurchase;
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
      });
  }, [data]);

  // Format large numbers with K suffix
  const formatValue = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value;
  };

  // Custom tooltip to match the theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="text-white font-medium">{payload[0].payload.fanLevel}</p>
          <p className="text-orange-400">
            Purchase Items: {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Total Purchase Items by Fan Level</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis 
              type="number"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
              tickFormatter={formatValue}
              label={{ 
                // value: 'Number of Purchase Items', 
                position: 'insideBottom',
                fill: '#94a3b8',
                dy: 15
              }}
            />
            <YAxis 
              type="category"
              dataKey="fanLevel"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              formatter={() => <span className="text-white">Purchase Item Count</span>}
            />
            <Bar 
              dataKey="purchaseCount" 
              fill="#f59e0b" 
              radius={[0, 4, 4, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchaseItemCountByFanLevel;