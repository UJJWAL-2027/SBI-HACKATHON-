import { useState, useEffect } from 'react';
import { Bot, Clock } from 'lucide-react';

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex items-center justify-between px-6 z-10 shadow-sm relative">
      <div className="flex items-center">
        <h2 className="text-lg font-bold text-navy-900 border-l-4 border-softblue-400 pl-3 leading-tight tracking-tight">
          SBI <span className="font-light text-gray-500">|</span> Enterprise Operations
        </h2>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 shadow-sm">
          <span className="relative flex h-2.5 w-2.5 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <Bot className="w-4 h-4 mr-1.5" />
          <span className="text-xs font-bold tracking-wide uppercase">AI Agent: Active</span>
        </div>
        
        <div className="flex flex-col items-end text-gray-500">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Live System Time</span>
          <div className="flex items-center text-sm font-mono text-navy-900 font-medium">
            <Clock className="w-4 h-4 mr-1.5 text-softblue-500" />
            {formatDate(time)} • {formatTime(time)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
