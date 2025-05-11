'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import Part1Filters from '../components/micro-marketing/Part1Filters';
import Part1Chart from '../components/micro-marketing/Part1Chart';
import DailyTimeChart from '../components/micro-marketing/DailyTimeChart';
import FanLevelTable from '../components/micro-marketing/FanLevelTable';
import EngagementChart from '../components/micro-marketing/EngagementChart';
import HierarchicalFlowchart from '../components/micro-marketing/HierarchicalFlowchart';
import StackedBarChart from '../components/micro-marketing/StackedBarChart';
import Part3Filters from '../components/micro-marketing/Part3Filters';
import LoginStatsCard from '../components/micro-marketing/LoginStatsCard';
import PurchaseStatsChart from '../components/micro-marketing/PurchaseStatsChart';
import FanLevelLoginPieChart from '../components/micro-marketing/FanLevelLoginPieChart';
import WeeklyTimeSpentLineChart from '../components/micro-marketing/WeeklyTimeSpentLineChart';
import PurchaseItemCountByFanLevel from '../components/micro-marketing/PurchaseItemCountByFanLevel';
import PurchasePriceSumByFanLevel from '../components/micro-marketing/PurchasePriceSumByFanLevel';

export default function MicroMarketingPage() {
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [csvDataPart3, setCsvDataPart3] = useState([]);
  const [filteredDataPart3, setFilteredDataPart3] = useState([]);
  const [activeTab, setActiveTab] = useState('part1');
  const [isLoadingPart3, setIsLoadingPart3] = useState(false);

  useEffect(() => {
    // Load main CSV data for Part 1 and Part 2
    Papa.parse('/micromarket.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setCsvData(result.data);
        setFilteredData(result.data);
      }
    });
  }, []);
  
  // Load Part 3 data only when that tab is activated
  useEffect(() => {
    if (activeTab === 'part3' && csvDataPart3.length === 0) {
      setIsLoadingPart3(true);
      Papa.parse('/micromarket4.csv', {
        download: true,
        header: true,
        complete: (result) => {
          setCsvDataPart3(result.data);
          setFilteredDataPart3(result.data);
          setIsLoadingPart3(false);
        },
        error: (error) => {
          console.error('Error loading Part 3 data:', error);
          setIsLoadingPart3(false);
        }
      });
    }
  }, [activeTab, csvDataPart3.length]);
  
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
  
  const applyFiltersPart3 = (filters) => {
    let data = csvDataPart3;
    
    // Process each filter group
    Object.entries(filters).forEach(([key, value]) => {
      if (value) data = data.filter(row => row[key] === value);
    });
    
    setFilteredDataPart3(data);
  };

  return (
    <Layout>
      <div className="bg-black text-white flex flex-col h-full">
        {/* Fixed header */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 ">
          <h2 className="text-2xl font-bold mb-3 md:mb-0">
            {activeTab === 'part1' ? 'Micro Market Strategy - Part I' : 
             activeTab === 'part2' ? 'Micro Market Strategy - Part II' : 
             'Micro Market Strategy - Part III'}
          </h2>
          
          {/* Toggle tabs - now with Part III */}
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
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'part3' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => handleTabChange('part3')}
            >
              Part III
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

            <div className="mt-8 bg-gray-900 rounded-lg p-4 max-w-[1200px] mx-auto">
              <h3 className="text-xl font-medium mb-4">Sum of Daily Time Spent Hours By Day</h3>
              <div className="h-96">
                <DailyTimeChart filteredData={filteredData} />
              </div>
            </div>

            <div className="mt-8 gap-6 max-w-[1200px] mx-auto">
              <FanLevelTable data={filteredData} />
            </div>

          </div>
        ) : activeTab === 'part2' ? (
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
        ) : (
          // Part 3 content
          <div className="p-4">
            {isLoadingPart3 ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="max-w-[1200px] mx-auto">
                <Part3Filters data={csvDataPart3} onFilterChange={applyFiltersPart3} />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                  <LoginStatsCard data={filteredDataPart3} />
                  <PurchaseStatsChart data={filteredDataPart3} />
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                  <FanLevelLoginPieChart data={filteredDataPart3} />
                  <WeeklyTimeSpentLineChart data={filteredDataPart3} />
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                  <PurchaseItemCountByFanLevel data={filteredDataPart3} />
                  <PurchasePriceSumByFanLevel data={filteredDataPart3} />
                </div>
                
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}