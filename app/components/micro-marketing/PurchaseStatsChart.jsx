import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PurchaseStatsChart = ({ data }) => {
  // Process the data to get purchase stats by item
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by Purchase_Item and calculate sum of Purchase_Price
    const groupedData = data.reduce((acc, item) => {
      const purchaseItem = item.Purchase_Item || 'None';
      const purchasePrice = parseFloat(item.Purchase_Price) || 0;

      if (!acc[purchaseItem]) {
        acc[purchaseItem] = { item: purchaseItem, increase: 0 };
      }
      
      acc[purchaseItem].increase += purchasePrice;
      return acc;
    }, {});

    // Convert to array and sort by item name
    const dataArray = Object.values(groupedData);
    
    // Calculate total
    const total = dataArray.reduce((sum, item) => sum + item.increase, 0);
    
    // Add total to the array
    return [...dataArray, { item: 'Total', total }];
  }, [data]);

  // Format large numbers with K, M suffixes
  const formatValue = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value;
  };

  // Custom tooltip to match the theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
            <p className="text-white font-medium">{data.item}</p>
            {data.increase !== undefined && (
            <p className="text-green-400">
                {formatValue(data.increase)}
            </p>
            )}
            {data.total !== undefined && (
            <p className="text-blue-400">
                {formatValue(data.total)}
            </p>
            )}
        </div>
        );
    }
    return null;
    };


  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-medium mb-6 text-white">Sum of Purchase Price by Purchase Item</h3>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="item" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            axisLine={{ stroke: '#4b5563' }}
            tickLine={{ stroke: '#4b5563' }}
            tickFormatter={formatValue}
            label={{ 
                value: 'Sum of Purchase Price', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#94a3b8',
                dx: -15,
                dy: 60// <-- This moves it down
            }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => <span className="text-white">{value}</span>}
            />
            <Bar dataKey="increase" name="Purchase Value" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="Total Purchase Value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchaseStatsChart;