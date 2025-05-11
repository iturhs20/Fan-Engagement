import { useState } from 'react';

const Part3Filters = ({ data, onFilterChange }) => {
  // All 6 filters for Part 3
  const fields = ['Fan_Level', 'Purchase_Item', 'Age_Group', 'Location', 'Login_ID', 'Device'];
  
  const [filters, setFilters] = useState({});

  const getUniqueValues = (field) => {
    if (!data || data.length === 0) return [];
    return [...new Set(data.map(d => d[field]))].filter(Boolean);
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = {
      ...filters,
      [field]: value === 'All' ? '' : value
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSelectAll = (field) => {
    const updatedFilters = {
      ...filters,
      [field]: ''
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const renderFilterSection = (field) => {
    return (
      <div className="bg-gray-800 rounded-lg p-3 md:p-4 flex-1 shadow-lg">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm md:text-base lg:text-lg font-medium">{field.replace('_', ' ')}</h3>
          <button 
            className="text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => handleSelectAll(field)}
          >
            Select All
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-1 md:p-2 border border-gray-700">
          <select 
            className="w-full bg-gray-900 text-white border-none text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onChange={(e) => handleFilterChange(field, e.target.value)}
            value={filters[field] || ''}
          >
            <option value="">All</option>
            {getUniqueValues(field).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-4">
        {fields.map(field => renderFilterSection(field))}
      </div>
    </div>
  );
};

export default Part3Filters;