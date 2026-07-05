import { Activity, Briefcase, FileText, HeartHandshake } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Signals Detected Today', stat: '14', icon: Activity, change: '+2', changeType: 'increase' },
    { name: 'Active Bereavement Cases', stat: '128', icon: Briefcase, change: '12', changeType: 'neutral' },
    { name: 'Documents Pending', stat: '45', icon: FileText, change: '-5', changeType: 'decrease' },
    { name: 'Re-engagement Ready', stat: '24', icon: HeartHandshake, change: '+4', changeType: 'increase' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-navy-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Grief Navigator Dashboard
      </h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 border-t-4 border-navy-500"
          >
            <dt>
              <div className="absolute rounded-md bg-softblue-100 p-3">
                <item.icon className="h-6 w-6 text-navy-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-navy-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold
                  ${item.changeType === 'increase' ? 'text-green-600' : ''}
                  ${item.changeType === 'decrease' ? 'text-red-600' : ''}
                  ${item.changeType === 'neutral' ? 'text-gray-500' : ''}
                `}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium leading-6 text-navy-900 mb-4">Recent Priority Cases</h2>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {[1, 2, 3].map((caseItem) => (
              <li key={caseItem}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-navy-600">Case #{1000 + caseItem} - Pending Nominee Contact</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-softblue-100 px-2 text-xs font-semibold leading-5 text-navy-800">
                        Action Required
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Activity className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        Signal: Cessation of Activity (14 days)
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Detected 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
