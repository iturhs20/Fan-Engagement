'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import Header from '../components/contest/Header';
import StatCards from '../components/contest/StatCards';
import Charts from '../components/contest/Charts';

// Import Contest Part 2 components
import CombinedDashboard from '../components/contest/Chart1';
import GenderPieChart from '../components/contest/GenderPieChart';
import TimeSpentBarChart from '../components/contest/TimeSpentBarChart';
import DataTable from '../components/contest/DataTable';
import DashboardFilters from '@/app/components/contest/DashboardFilters';

export default function ContestsPage() {
  // Part 1 state
  const [data, setData] = useState([]);
  const [sportType, setSportType] = useState('');
  const [contestName, setContestName] = useState('');
  const [activeTab, setActiveTab] = useState('page1');
  
  // Part 2 state
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    Age_Group: '',
    Location: '',
    Item_Purchased: '',
    Contest_ID: '',
    Country: ''
  });

  // Load Part 1 data
  useEffect(() => {
    fetch('/contest1.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
          }
        });
      });
  }, []);

  // Load Part 2 data
  useEffect(() => {
    if (activeTab === 'page2') {
      Papa.parse('/contest2.csv', {
        header: true,
        download: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          setOriginalData(results.data);
        }
      });
    }
  }, [activeTab]);

  // Filter Part 2 data based on filters
  useEffect(() => {
    const filtered = originalData.filter((row) =>
      Object.keys(filters).every((key) =>
        !filters[key] || row[key] === filters[key]
      )
    );
    setFilteredData(filtered);
  }, [originalData, filters]);

  // Part 1 filtering
  const filteredPart1Data = data.filter(item =>
    (sportType ? item.Sport_Type === sportType : true) &&
    (contestName ? item.Contest_Name === contestName : true)
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="bg-black text-white flex flex-col h-full">
        {/* Fixed header */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 ">
          <h2 className="text-2xl font-bold mb-3 md:mb-0">
            {activeTab === 'page1' ? 'Contest Page 1' : 'Contest Page 2'}
          </h2>
          
          {/* Toggle tabs */}
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'page1' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => handleTabChange('page1')}
            >
              Part I
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'page2' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => handleTabChange('page2')}
            >
              Part II
            </button>
          </div>
        </div>
        
        {activeTab === 'page1' ? (
          <div className="p-6 space-y-6">
            <Header
              data={Array.isArray(data) ? data : []}
              sportType={sportType}
              setSportType={setSportType}
              contestName={contestName}
              setContestName={setContestName}
            />
            <StatCards data={filteredPart1Data} />
            <Charts data={filteredPart1Data} />
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <DashboardFilters filters={filters} setFilters={setFilters} data={originalData} />
            <div>
              <CombinedDashboard data={filteredData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GenderPieChart data={filteredData} />
              <TimeSpentBarChart data={filteredData} />
            </div>
            <DataTable data={filteredData} />
          </div>
        )}
      </div>
    </Layout>
  );
}