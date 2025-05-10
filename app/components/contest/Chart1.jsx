
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

// Consistent color theme
const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884d8'];

const ImprovedCombinedDashboard = ({ data }) => {
  // Process data with useMemo for better performance
  const { pieChartData, totalValue, chartData, itemTypes, itemToColorMap } = useMemo(() => {
    // Device Pie Chart data processing
    const deviceCounts = data.reduce((acc, row) => {
      acc[row.Device] = (acc[row.Device] || 0) + 1;
      return acc;
    }, {});

    const pieData = Object.entries(deviceCounts).map(([key, val]) => ({
      name: key,
      value: val,
    }));

    // Calculate total value for center of pie chart
    const total = data.reduce((sum, row) => {
      return sum + parseFloat(row.Purchase_Value || 0);
    }, 0);
    
    // Round to nearest whole number
    const totalValue = Math.round(total);

    // Purchase Bar Chart data processing
    // Get unique contest IDs and item types
    const contestIds = [...new Set(data.map(row => row.Contest_ID).filter(Boolean))];
    const itemTypes = [...new Set(data.map(row => row.Item_Purchased).filter(Boolean))];
    
    // Sort contest IDs
    contestIds.sort();
    
    // Create result data structure
    const barData = contestIds.map(contestId => {
      const rowData = { Contest_ID: contestId };
      
      // Add sum for each item type
      itemTypes.forEach(itemType => {
        const relevantRows = data.filter(
          row => row.Contest_ID === contestId && row.Item_Purchased === itemType
        );
        
        const sum = relevantRows.reduce(
          (total, row) => total + parseFloat(row.Purchase_Value || 0), 
          0
        );
        
        rowData[itemType] = sum;
      });
      
      return rowData;
    });
    
    // Map item types to colors
    const colorMap = {};
    itemTypes.forEach((item, index) => {
      colorMap[item] = COLORS[index % COLORS.length];
    });

    return { 
      pieChartData: pieData, 
      totalValue, 
      chartData: barData, 
      itemTypes,
      itemToColorMap: colorMap 
    };
  }, [data]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow w-full lg:w-1/3">
          <h3 className="text-lg font-semibold mb-4 text-white text-center">Device Distribution</h3>
          <div className="flex justify-center mt-24">
            <PieChart width={240} height={220}>
              <Pie 
                data={pieChartData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={70}
                innerRadius={50}
                paddingAngle={2}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#2d3748" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} 
                formatter={(value, name) => [`${value} users`, name]} 
                itemStyle={{ color: 'white' }} 
                labelStyle={{ color: 'white' }} 
              />
              <Legend 
                wrapperStyle={{ color: 'white' }}
                layout="horizontal"
                verticalAlign="bottom"
                align="center" 
              />
            </PieChart>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow w-full lg:w-2/3">
          <h3 className="text-lg font-semibold mb-4 text-white text-center">Sum of purchase value by contest ID and items purchased</h3>
          
          <div className="flex mb-4 justify-center gap-4 flex-wrap">
            {itemTypes.map((item) => (
              <div key={item} className="flex items-center gap-1">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: itemToColorMap[item] }}
                ></div>
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2">
            <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 50)}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 'dataMax + 5000']}
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }}
                  tickFormatter={(value) => `$${Math.round(value / 1000)}K`}
                />
                <YAxis 
                  dataKey="Contest_ID" 
                  type="category" 
                  tick={{ fontSize: 12, fill: '#ffffff' }} 
                  stroke="#ffffff"
                  width={120}
                />
                <Tooltip 
                  formatter={(value) => [`${(value/1000).toFixed(1)}K`, '']}
                  labelFormatter={(label) => `Contest: ${label}`}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '4px' }}
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
                
                {itemTypes.map((item) => (
                  <Bar 
                    key={item} 
                    dataKey={item} 
                    stackId="a" 
                    fill={itemToColorMap[item]}
                    radius={[0, 4, 4, 0]}
                  >
                    <LabelList 
                      dataKey={item} 
                      position="inside" 
                      fill="#fff" 
                      formatter={(value) => value > 0 ? `${(value/1000).toFixed(0)}K` : ''}
                      style={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedCombinedDashboard;