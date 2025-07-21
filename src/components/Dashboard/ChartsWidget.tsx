import React from 'react';
import { TrendingUp } from 'lucide-react';

const ChartsWidget: React.FC = () => {
  const data = [
    { year: '1ère', students: 245, color: 'bg-blue-500' },
    { year: '2ème', students: 223, color: 'bg-blue-400' },
    { year: '3ème', students: 198, color: 'bg-blue-300' },
    { year: '4ème', students: 187, color: 'bg-blue-200' },
    { year: '5ème', students: 165, color: 'bg-blue-100' },
    { year: '6ème', students: 142, color: 'bg-gray-300' },
    { year: 'Doctorat', students: 85, color: 'bg-gray-200' }
  ];

  const maxStudents = Math.max(...data.map(d => d.students));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Répartition des étudiants</h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-sm font-medium text-gray-600">
              {item.year}
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all duration-700 ease-out`}
                  style={{ width: `${(item.students / maxStudents) * 100}%` }}
                />
              </div>
              <div className="w-12 text-sm font-semibold text-gray-800">
                {item.students}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">Total des étudiants</span>
          <span className="text-lg font-bold text-blue-900">
            {data.reduce((sum, item) => sum + item.students, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartsWidget;