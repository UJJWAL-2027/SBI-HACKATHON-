import { Link, useLocation } from 'react-router-dom';
import { Activity, Briefcase, FileText, HeartHandshake, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Signal Detection', href: '/signals', icon: Activity },
    { name: 'Active Cases', href: '/cases', icon: Briefcase },
    { name: 'Document Hub', href: '/documents', icon: FileText },
    { name: 'Re-engagement', href: '/reengagement', icon: HeartHandshake },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-navy-900 text-white shadow-xl z-20">
      <div className="flex h-16 shrink-0 items-center px-6 bg-navy-950 border-b border-navy-800">
        <HeartHandshake className="h-8 w-8 text-softblue-300" />
        <span className="ml-3 text-xl font-semibold tracking-tight text-white">Grief Navigator</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="flex-1 space-y-2 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-navy-700 text-white shadow-sm ring-1 ring-navy-600' 
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'}
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0 transition-colors
                    ${isActive ? 'text-softblue-300' : 'text-gray-400 group-hover:text-softblue-300'}
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-navy-800 p-4 bg-navy-950">
        <div className="flex flex-col text-xs text-gray-400 space-y-1">
          <span>SBI Internal Tool v2.4</span>
          <span className="font-semibold text-softblue-300">Powered by Agentic AI</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
