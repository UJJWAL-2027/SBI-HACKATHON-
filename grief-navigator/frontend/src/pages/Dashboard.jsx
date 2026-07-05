import { useState, useEffect } from 'react';
import { Activity, Briefcase, FileText, HeartHandshake, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother animation (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

const AnimatedNumber = ({ value }) => {
  const count = useCountUp(parseInt(value, 10));
  return <span>{count}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { name: 'Signals Detected Today', stat: '14', icon: Activity, change: '+2', changeType: 'increase', link: '/signals' },
    { name: 'Active Bereavement Cases', stat: '128', icon: Briefcase, change: '12', changeType: 'neutral', link: '/cases' },
    { name: 'Documents Pending', stat: '45', icon: FileText, change: '-5', changeType: 'decrease', link: '/documents' },
    { name: 'Re-engagement Ready', stat: '24', icon: HeartHandshake, change: '+4', changeType: 'increase', link: '/reengagement' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-navy-900 sm:truncate sm:text-3xl sm:tracking-tight mb-2">
          Grief Navigator Dashboard
        </h1>
        <p className="text-gray-500 text-sm">System Overview and Real-time Metrics</p>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.link)}
            className="relative overflow-hidden rounded-xl bg-white px-4 pt-5 pb-12 shadow-sm border border-gray-200 border-t-4 border-t-navy-600 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <dt>
              <div className="absolute rounded-lg bg-softblue-50 p-3 ring-1 ring-inset ring-softblue-100 group-hover:bg-softblue-100 transition-colors">
                <item.icon className="h-6 w-6 text-navy-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-3xl font-bold text-navy-900">
                <AnimatedNumber value={item.stat} />
              </p>
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
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-3 sm:px-6 border-t border-gray-100 group-hover:bg-navy-50 transition-colors">
              <div className="text-sm">
                <span className="font-medium text-navy-600 flex items-center justify-between">
                  View details <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium leading-6 text-navy-900">Recent Priority Cases</h2>
          <button onClick={() => navigate('/cases')} className="text-sm font-medium text-navy-600 hover:text-navy-900">View all</button>
        </div>
        <div className="overflow-hidden bg-white shadow-sm border border-gray-200 sm:rounded-xl">
          <ul role="list" className="divide-y divide-gray-100">
            {[
              { id: '1001', name: 'Ramesh Krishnan', signal: 'Condolence transfers detected', time: '10 mins ago', action: 'Action Required' },
              { id: '1002', name: 'Vikram Desai', signal: 'Multiple contacts sending small amounts', time: '2 hours ago', action: 'Action Required' },
              { id: '1003', name: 'Rajesh Gupta', signal: 'Nominee downloaded Claim Form', time: '5 hours ago', action: 'Action Required' },
            ].map((caseItem) => (
              <li key={caseItem.id}>
                <div onClick={() => navigate('/signals')} className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-bold text-navy-900">Case #{caseItem.id} — {caseItem.name}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold leading-5 text-amber-800 ring-1 ring-inset ring-amber-600/20">
                        {caseItem.action}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 font-medium">
                        <Activity className="mr-1.5 h-4 w-4 flex-shrink-0 text-navy-400" />
                        Signal: {caseItem.signal}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 font-mono">
                      <p>Detected {caseItem.time}</p>
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
