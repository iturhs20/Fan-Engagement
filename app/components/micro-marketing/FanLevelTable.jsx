import React from 'react';

const FanLevelTable = ({ data }) => {
  return (
    <div className="bg-gray-900 p-4 rounded shadow mb-6">
      <h3 className="text-white text-xl font-semibold mb-4">Fan Level Data</h3>
      <div className="h-64 overflow-y-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Login_ID</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Fan_Level</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-800">
                <td className="py-3 px-4 text-gray-300">{row.Login_ID}</td>
                <td className="py-3 px-4 text-gray-300">{row.Fan_Level || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FanLevelTable;