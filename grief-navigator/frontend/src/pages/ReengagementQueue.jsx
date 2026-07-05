import { useState } from 'react';
import { Send, HeartHandshake, ShieldCheck, X, Check, Clock, Reply, CheckCircle2 } from 'lucide-react';

const mockQueue = [
  {
    id: 1,
    nominee: 'Priya Krishnan',
    relationship: 'Daughter',
    deceasedName: 'Ramesh Krishnan',
    closedDate: '2026-04-10',
    daysSince: 86,
    amountSettled: '₹14,50,000 settled',
    suggestion: 'FD renewal / Fixed Income',
    status: 'Scheduled'
  },
  {
    id: 2,
    nominee: 'Sunita Verma',
    relationship: 'Wife',
    deceasedName: 'Amitabh Verma',
    closedDate: '2026-04-22',
    daysSince: 74,
    amountSettled: '₹32,00,000 settled',
    suggestion: 'Senior Citizen Savings Scheme',
    status: 'Sent'
  },
  {
    id: 3,
    nominee: 'Rahul Patel',
    relationship: 'Son',
    deceasedName: 'Lata Patel',
    closedDate: '2026-03-15',
    daysSince: 112,
    amountSettled: '₹8,20,000 settled',
    suggestion: 'SIP for child\'s education',
    status: 'Responded'
  },
  {
    id: 4,
    nominee: 'Sneha Sharma',
    relationship: 'Daughter',
    deceasedName: 'Rajesh Sharma',
    closedDate: '2026-03-01',
    daysSince: 126,
    amountSettled: '₹4,20,000 settled',
    suggestion: 'Savings account upgrade',
    status: 'Converted'
  },
  {
    id: 5,
    nominee: 'Mohammed Ali Jr.',
    relationship: 'Son',
    deceasedName: 'Mohammed Ali',
    closedDate: '2026-05-01',
    daysSince: 65,
    amountSettled: '₹1,15,000 settled',
    suggestion: 'Term insurance',
    status: 'Scheduled'
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Scheduled':
      return <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"><Clock className="w-3 h-3 mr-1" /> Scheduled</span>;
    case 'Sent':
      return <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"><Send className="w-3 h-3 mr-1" /> Sent</span>;
    case 'Responded':
      return <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"><Reply className="w-3 h-3 mr-1" /> Responded</span>;
    case 'Converted':
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Converted</span>;
    default:
      return null;
  }
};

const ReengagementQueue = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Banner */}
      <div className="bg-navy-800 rounded-lg p-4 mb-6 flex items-start sm:items-center shadow-md border-l-4 border-softblue-300">
        <ShieldCheck className="h-6 w-6 text-softblue-300 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
        <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
          Grief Navigator never initiates re-engagement before <strong className="text-softblue-200">60 days</strong>. All messages are reviewed for tone by the AI ethics filter before sending.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Re-engagement Queue</h1>
        <p className="text-gray-500 text-sm mt-1">Compassionate outreach for families whose settlements have successfully concluded.</p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-300 sm:rounded-lg overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nominee</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Relationship</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Case Closed</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Days Since</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount Settled</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Suggested Action</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockQueue.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-navy-900 sm:pl-6">{item.nominee}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.relationship}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{item.closedDate}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`font-semibold ${item.daysSince < 90 ? 'text-gray-600' : 'text-navy-600'}`}>
                      {item.daysSince} days
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-green-700">{item.amountSettled}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">{item.suggestion}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getStatusBadge(item.status)}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => setSelectedPerson(item)}
                      disabled={item.status === 'Converted'}
                      className={`flex items-center justify-end w-full px-3 py-1.5 rounded-md transition-colors ${
                        item.status === 'Converted' 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-navy-600 hover:text-navy-900 bg-navy-50 hover:bg-navy-100'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4 mr-1.5" />
                      {item.status === 'Sent' || item.status === 'Responded' ? 'Follow Up' : 'Send Compassionate Offer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Preview Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedPerson(null)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Compassionate Outreach</h3>
                <p className="text-xs text-navy-200 mt-0.5">To: {selectedPerson.nominee}</p>
              </div>
              <button onClick={() => setSelectedPerson(null)} className="text-navy-200 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-green-600 mr-1.5" />
                  AI Ethics Filter: Approved
                </div>
                <div className="text-xs font-mono text-gray-400">
                  {selectedPerson.daysSince} days post-closure
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 relative">
                {/* Decorative quotes */}
                <div className="text-4xl text-gray-300 absolute top-2 left-3 font-serif leading-none">"</div>
                
                <p className="text-gray-700 whitespace-pre-wrap relative z-10 px-2 pt-2 text-[15px] leading-relaxed">
                  Dear {selectedPerson.nominee},
                  <br/><br/>
                  We hope you and your family are doing well. As {selectedPerson.deceasedName}'s nominated beneficiary, your settlement has been completed.
                  <br/><br/>
                  When you feel ready, our team is here to help you plan what comes next. No rush, we're just a message away.
                  <br/><br/>
                  Warm regards,
                  <br/>Your SBI Care Team
                </p>
                
                <div className="text-4xl text-gray-300 absolute bottom-0 right-3 font-serif leading-none rotate-180">"</div>
              </div>

              <div className="mt-4 bg-softblue-50 border border-softblue-100 rounded-lg p-3 flex items-start">
                <HeartHandshake className="w-5 h-5 text-navy-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-navy-800 leading-snug">
                  <span className="font-bold block mb-0.5">Suggested Internal Flag:</span> 
                  Based on the {selectedPerson.amountSettled}, the agent suggests recommending <strong className="font-semibold">"{selectedPerson.suggestion}"</strong> if the customer responds positively to this initial check-in.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedPerson(null)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setSelectedPerson(null)}
                className="flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg text-sm font-medium hover:bg-navy-700 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReengagementQueue;
