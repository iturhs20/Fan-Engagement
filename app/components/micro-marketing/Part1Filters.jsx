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

  const renderFilterSection = (field) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4 flex-1">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-lg">{field.replace('_', ' ')}</h3>
          <button className="text-sm text-blue-400">Select All</button>
        </div>
        <div className="bg-black rounded-lg p-2">
          <select 
            className="w-full bg-black text-white border-none"
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
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {fields.slice(0, 4).map(field => renderFilterSection(field))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {fields.slice(4, 6).map(field => renderFilterSection(field))}
      </div>
    </div>
  );
};

export default Part1Filters;