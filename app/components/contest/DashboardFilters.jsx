import React from 'react';

const DashboardFilters = ({ filters, setFilters, data }) => {
  const getUniqueValues = (field) =>
    [...new Set(data.map((row) => row[field]).filter(Boolean))];

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([field, value]) =>
      value ? row[field] === value : true
    )
  );

  const totalPurchaseValue = filteredData.reduce(
    (acc, row) => acc + parseFloat(row.Purchase_Value || 0),
    0
  );

  const filterFields = ['Contest_ID', 'Age_Group', 'Item_Purchased', 'Location'];

  const displayNames = {
    'Contest_ID': 'Contest ID',
    'Age_Group': 'Age Group',
    'Device': 'Device',
    'Location': 'Location',
    'Item_Purchased': 'Item Purchased'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {filterFields.map((field) => (
        <div
          key={field}
          className="bg-gray-900 p-4 rounded-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">{displayNames[field]}</span>
            <span
              className="text-blue-400 text-sm cursor-pointer"
              onClick={() => setFilters((prev) => ({ ...prev, [field]: '' }))}
            >
              Select All
            </span>
          </div>
          <div className="relative">
            <select
              className="w-full py-2 px-3 bg-gray-800 text-white rounded-md appearance-none border border-gray-700"
              value={filters[field] || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [field]: e.target.value }))
              }
            >
              <option value="">All</option>
              {getUniqueValues(field).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      ))}

      {/* Revenue Card */}
      <div className="bg-gray-900 p-4 rounded-lg flex flex-col justify-center items-center">
        <div className="text-green-400 text-3xl font-bold mb-1">
          {Math.round(totalPurchaseValue / 1000)}K
        </div>
        <div className="text-gray-400 text-sm">Revenue from sales</div>
      </div>
    </div>
  );
};

export default DashboardFilters;
