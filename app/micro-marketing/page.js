'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import Part1Filters from '../components/micro-marketing/Part1Filters';
import Part1Chart from '../components/micro-marketing/Part1Chart';
import EngagementChart from '../components/micro-marketing/EngagementChart';
import HierarchicalFlowchart from '../components/micro-marketing/HierarchicalFlowchart';
import StackedBarChart from '../components/micro-marketing/StackedBarChart';

export default function MicroMarketingPage() {
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('part1');

  useEffect(() => {
    Papa.parse('/micromarket.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setCsvData(result.data);
        setFilteredData(result.data);
      }
    });
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const applyFilters = (filters) => {
    let data = csvData;
    
    // Process each filter group
    Object.entries(filters).forEach(([key, value]) => {
      if (value) data = data.filter(row => row[key] === value);
    });
    
    setFilteredData(data);
  };

  return (
    <Layout>
      <div className="bg-black text-white flex flex-col h-full">
        {/* Fixed header */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold mb-3 md:mb-0">
            {activeTab === 'part1' ? 'Micro Market Strategy - Part I' : 'Micro Market Strategy - Part II'}
          </h2>
          
          {/* Toggle tabs */}
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'part1' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => handleTabChange('part1')}
            >
              Part I
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'part2' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => handleTabChange('part2')}
            >
              Part II
            </button>
          </div>
        </div>
        
        {/* Content */}
        {activeTab === 'part1' ? (
          <div className="p-4">
            <Part1Filters data={csvData} onFilterChange={applyFilters} />
            
            <div className="mt-8 bg-gray-900 rounded-lg p-4 max-w-[1200px] mx-auto">
              <h3 className="text-xl font-medium mb-4">Average Of Fan_Level_Index1 By Day</h3>
              <div className="h-96">
                <Part1Chart filteredData={filteredData} />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            
            
            {/* Engagement Chart */}
            <div className="rounded-lg p-4 -mb-5">
              <EngagementChart />
            </div>

            {/* Drill Down Chart - new component */}
            <div className="rounded-lg p-7 -mb-5">
              <HierarchicalFlowchart />
            </div>

            {/* Stacked Bar Chart - newly added component */}
            <div className="rounded-lg p-7">
              <StackedBarChart />
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}