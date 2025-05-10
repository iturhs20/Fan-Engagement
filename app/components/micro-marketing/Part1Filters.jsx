import { useState } from 'react';

const Part1Filters = ({ data, onFilterChange }) => {
  // All fields are treated the same way now
  const fields = ['Contest_ID', 'Age_Group', 'Device', 'Location', 'Contest_Name', 'Login_ID'];
  
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
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-4">
        {fields.slice(0, 4).map(field => renderFilterSection(field))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
        {fields.slice(4, 6).map(field => renderFilterSection(field))}
      </div>
    </div>
  );
};

export default Part1Filters;