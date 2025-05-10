'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import Header from '../components/contest/Header';
import StatCards from '../components/contest/StatCards';
import Charts from '../components/contest/Charts';

export default function ContestsPage() {
  const [data, setData] = useState([]);
  const [sportType, setSportType] = useState('');
  const [contestName, setContestName] = useState('');
  const [activeTab, setActiveTab] = useState('page1');

  useEffect(() => {
    fetch('/contest1.csv') // assuming it's placed in your `public` folder
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

  const filteredData = data.filter(item =>
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
        
        <div className="p-6 space-y-6">
          <Header
            data={Array.isArray(data) ? data : []}
            sportType={sportType}
            setSportType={setSportType}
            contestName={contestName}
            setContestName={setContestName}
          />
          <StatCards data={filteredData} />
          <Charts data={filteredData} />
        </div>
      </div>
    </Layout>
  );
}