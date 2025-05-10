import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ data }) => {
  const COLORS = ['#4ADE80', '#FFC107']; // Green and Yellow/Gold
  
  const barData = data.map(d => ({
    name: d.Contest_Name,
    User_Count: parseInt(d.User_Count),
    Total_Registrations: parseInt(d.Total_Registrations),
  }));

  const pieData = [
    { name: 'Sum of Returning_Users (%)', value: data.reduce((sum, d) => sum + parseFloat(d['Returning_Users (%)'] || 0), 0) },
    { name: 'Sum of New_Users (%)', value: data.reduce((sum, d) => sum + parseFloat(d['New_Users (%)'] || 0), 0) },
  ];

  // Calculate total for inner text
  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-xl font-medium mb-4 text-white">
          Sum Of Returning_Users And Sum Of New-Users
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                <tspan x="50%" dy="-10" className="text-lg font-medium fill-white">{totalValue.toFixed(0)}</tspan>
                <tspan x="50%" dy="25" className="text-xs fill-gray-400">Total</tspan>
              </text>
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-4">
          {pieData.map((entry, index) => (
            <div key={`stat-${index}`} className="bg-gray-800 rounded-lg p-3">
                <div className="text-sm text-gray-300">{entry.name}</div>
                <div className="flex justify-between items-center mt-1">
                <span className="text-lg font-medium text-white">{entry.value.toFixed(0)}</span>
                </div>
            </div>
           ))}
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-xl font-medium mb-4 text-white">Bar Chart</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} axisLine={{ stroke: '#374151' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} axisLine={{ stroke: '#374151' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="User_Count" fill="#3B82F6" />
              <Bar dataKey="Total_Registrations" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;