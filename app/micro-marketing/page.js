'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import Part1Filters from '../components/micro-marketing/Part1Filters';
import Part1Chart from '../components/micro-marketing/Part1Chart';

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
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Micro Market Strategy - Part I</h2>
          <div className="text-blue-400">
            <span className="mr-2">Micro Market Strategy - Part I</span> 
            / 
            <span className="ml-2 text-gray-400 cursor-pointer">Micro Market Strategy - Part II</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <Part1Filters data={csvData} onFilterChange={applyFilters} />
          
          <div className="mt-8 bg-gray-900 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-4">Average Of Fan_Level_Index1 By Day</h3>
            <div className="h-96">
              <Part1Chart filteredData={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}