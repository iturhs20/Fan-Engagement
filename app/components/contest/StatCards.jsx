import { ArrowUpRight } from 'lucide-react';

const fields = [
  { label: 'Total Registration', key: 'Total_Registrations', format: (value) => `${value}K` },
  { label: 'User Count', key: 'User_Count', format: (value) => `${value}K` },
  { label: 'Engagement Rate', key: 'Engagement_Rate (%)', format: (value) => value },
  { label: 'Bounce Rate', key: 'Bounce_Rate (%)', format: (value) => value },
  { label: 'Participation Rate', key: 'Participation_Rate (%)', format: (value) => value },
  { label: 'Contest Revenue', key: 'Contest_Revenue (INR)', format: (value) => `${value}K` },
  { label: 'Buyer Percentage', key: 'Buyers_Percentage (%)', format: (value) => `%${value}` }
];

const StatCards = ({ data }) => {
  const totals = fields.map(field => {
    const value = data.reduce((sum, d) => sum + parseFloat(d[field.key] || 0), 0);
    return {
      label: field.label,
      value: field.format(Math.round(value)),
    };
  });

  // First row - 4 cards
  const firstRowCards = totals.slice(0, 4);
  // Second row - 3 cards
  const secondRowCards = totals.slice(4);

  return (
    <div className="space-y-4">
      {/* First row - 4 cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {firstRowCards.map(stat => (
          <div key={stat.label} className="bg-gray-900 rounded-lg p-4 flex flex-col h-32">
            <div className="flex justify-between items-start">
              <span className="text-green-400 font-bold text-2xl">{stat.value}</span>
              <div className="bg-gray-800 rounded p-3">
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <span className="text-gray-400 text-sm mt-2">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Second row - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondRowCards.map(stat => (
          <div key={stat.label} className="bg-gray-900 rounded-lg p-4 flex flex-col h-32">
            <div className="flex justify-between items-start">
              <span className="text-green-400 font-bold text-2xl">{stat.value}</span>
              <div className="bg-gray-800 rounded p-3">
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <span className="text-gray-400 text-sm mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCards;