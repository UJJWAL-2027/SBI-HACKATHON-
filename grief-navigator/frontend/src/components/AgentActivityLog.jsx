import { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal, Activity, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

const mockLogs = [
  { id: 1, time: '14:32', message: 'Signal detected: Account XXXX8821 — 45 days inactivity', icon: Activity, color: 'text-amber-500' },
  { id: 2, time: '14:28', message: 'WhatsApp message sent to nominee: Priya Sharma', icon: MessageSquare, color: 'text-blue-500' },
  { id: 3, time: '14:15', message: 'Document verified: Death Certificate for case #GN-2024-041', icon: CheckCircle2, color: 'text-green-500' },
  { id: 4, time: '13:58', message: 'Re-engagement scheduled: Meena Iyer — Day 61', icon: Clock, color: 'text-purple-500' },
  { id: 5, time: '13:10', message: 'Workflow initiated: FD Transmission for account XXXX4921', icon: Terminal, color: 'text-navy-500' },
];

const AgentActivityLog = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-t-xl rounded-b-lg shadow-2xl border border-gray-200 transition-all duration-300 z-50 ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
      {/* Header (Clickable to toggle) */}
      <div 
        className="h-12 bg-navy-900 rounded-t-xl px-4 flex items-center justify-between cursor-pointer text-white"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Terminal className="w-4 h-4 mr-2 text-softblue-300" />
          <span className="font-semibold text-sm tracking-wide uppercase">Agent Activity Log</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-300" /> : <ChevronUp className="w-5 h-5 text-gray-300" />}
        </div>
      </div>
      
      {/* Log Content */}
      <div className="h-64 overflow-y-auto p-4 bg-gray-50 rounded-b-lg scrollbar-hide border-x border-b border-gray-200">
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent hidden sm:block"></div>
        <ul className="relative space-y-3">
          {mockLogs.map((log) => (
            <li key={log.id} className="flex items-start">
              <div className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 mr-3 mt-0.5`}>
                <log.icon className={`h-3 w-3 ${log.color}`} />
              </div>
              <div className="min-w-0 flex-1 bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-800 leading-relaxed font-mono">
                  <span className="font-bold text-navy-600 mr-1.5">[{log.time}]</span>
                  {log.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Listening for new events...</p>
        </div>
      </div>
    </div>
  );
};

export default AgentActivityLog;
