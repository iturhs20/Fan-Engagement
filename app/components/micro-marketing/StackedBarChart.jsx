import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import Papa from 'papaparse';

const StackedBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse('/micromarket3.csv', {
      download: true,
      header: true,
      dynamicTyping: true, // Automatically convert numeric values
      skipEmptyLines: true,
      complete: (result) => {
        processData(result.data);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setIsLoading(false);
      }
    });
  }, []);

  const processData = (rawData) => {
    // Group data by week
    const groupedByWeek = rawData.reduce((acc, row) => {
      const week = row.Week || 0;
      
      if (!acc[week]) {
        acc[week] = {
          week: `Week ${week}`,
          Visitors: 0,
          Onboarding: 0,
          Uniq: 0,
          Engage: 0,
          Churn: 0
        };
      }
      
      // Add the values
      acc[week].Visitors += Number(row.Visitors) || 0;
      acc[week].Onboarding += Number(row.Onboarding) || 0;
      acc[week].Uniq += Number(row.Uniq) || 0;
      acc[week].Engage += Number(row.Engage) || 0;
      acc[week].Churn += Number(row.Churn) || 0;
      
      return acc;
    }, {});
    
    // Convert the grouped data to an array for recharts
    const formattedData = Object.values(groupedByWeek);
    
    // Sort by week number
    formattedData.sort((a, b) => {
      const weekA = parseInt(a.week.split(' ')[1]);
      const weekB = parseInt(b.week.split(' ')[1]);
      return weekA - weekB;
    });
    
    setChartData(formattedData);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading chart data...</div>;
  }

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-xl font-medium mb-4 text-white">Customer Journey Snapshot</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
            <XAxis 
              dataKey="week" 
              stroke="#ccc"
              height={50}
              tick={{
                fill: '#ccc',
                angle: 0 // Ensure the text is horizontal, not upside down
              }}
              tickMargin={10} // Add some margin below the ticks
            />
            <YAxis 
              stroke="#ccc" 
              tickFormatter={formatYAxis}
              label={{ 
                // value: 'Visitors, Onboarding, Uniq, Engage, Churn', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#ccc' }
              }} 
            />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat().format(value)}
              contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '4px' }}
              labelStyle={{ fontWeight: 'bold', color: '#ddd' }}
            />
            <Legend wrapperStyle={{ color: '#ccc' }} />
            <Bar dataKey="Visitors" stackId="a" fill="#36A2EB" name="Visitors" />
            <Bar dataKey="Onboarding" stackId="a" fill="#4C51BF" name="Onboarding" />
            <Bar dataKey="Uniq" stackId="a" fill="#ED8936" name="Uniq" />
            <Bar dataKey="Engage" stackId="a" fill="#9F7AEA" name="Engage" />
            <Bar dataKey="Churn" stackId="a" fill="#ED64A6" name="Churn" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;