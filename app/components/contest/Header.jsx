import { Info } from 'lucide-react';

const Header = ({ data, sportType, setSportType, contestName, setContestName }) => {
  const sportTypes = [...new Set(data.map(d => d.Sport_Type))];
  const contestNames = [...new Set(data.map(d => d.Contest_Name))];

  return (
    <div className=" space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col space-y-6 w-full">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Contest Name</span>
                <span className="text-blue-500 cursor-pointer">Select All</span>
              </div>
              <select
                value={contestName}
                onChange={(e) => setContestName(e.target.value)}
                className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {contestNames.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Sport Type</span>
                <span className="text-blue-500 cursor-pointer">Select All</span>
              </div>
              <select
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
                className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {sportTypes.map((sport, i) => (
                  <option key={i} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;