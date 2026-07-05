import { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, X, Info, Activity } from 'lucide-react';

const mockSignals = [
  {
    id: 1,
    name: 'Ramesh Krishnan',
    account: 'XXXX4921',
    lastActivity: '2026-06-15',
    signalType: 'Condolence transfers detected',
    strength: 'High',
    status: 'Alert Triggered',
    timeline: [
      { date: '2026-07-01', event: 'Received ₹1000 from 4 distinct contacts with notes like "condolences", "in memory"' },
      { date: '2026-07-02', event: 'Nominee (Priya Krishnan) searched "claim forms" in SBI YONO app' },
      { date: '2026-07-04', event: 'Total cessation of UPI activity from primary device' }
    ],
    reasoning: 'The AI agent detected a sudden influx of small-denomination transfers with condolence-related remarks. This was corroborated by the registered nominee proactively searching for claim forms in the mobile app, strongly indicating a bereavement event.'
  },
  {
    id: 2,
    name: 'Sunita Sharma',
    account: 'XXXX8834',
    lastActivity: '2026-05-20',
    signalType: 'Complete inactivity 30+ days',
    strength: 'Medium',
    status: 'Monitoring',
    timeline: [
      { date: '2026-05-20', event: 'Last recorded UPI transaction' },
      { date: '2026-06-25', event: 'Missed scheduled SIP payment due to insufficient balance (first time in 4 years)' },
    ],
    reasoning: 'Account shows complete cessation of previously regular daily activity for over 30 days, alongside a missed, long-standing automated payment. Monitoring for further corroborating signals.'
  },
  {
    id: 3,
    name: 'Vikram Desai',
    account: 'XXXX1109',
    lastActivity: '2026-06-28',
    signalType: 'Multiple contacts sending small amounts',
    strength: 'High',
    status: 'Alert Triggered',
    timeline: [
      { date: '2026-06-28', event: 'Last ATM withdrawal' },
      { date: '2026-07-03', event: 'Received 8 inward NEFT transfers of ₹501 and ₹1001 from family accounts' },
    ],
    reasoning: 'The pattern of receiving specific small denominations (₹501, ₹1001) from multiple family members within a 24-hour window strongly correlates with traditional Indian mourning/condolence customs.'
  },
  {
    id: 4,
    name: 'Anita Patel',
    account: 'XXXX7752',
    lastActivity: '2026-06-10',
    signalType: 'Nominee query spike',
    strength: 'Low',
    status: 'Monitoring',
    timeline: [
      { date: '2026-07-05', event: 'Incoming call from registered mobile number querying about "joint account freeze rules"' },
    ],
    reasoning: 'A single high-intent query was made regarding joint account freezes. Signal strength is low as it could be general financial planning. Requires further monitoring.'
  },
  {
    id: 5,
    name: 'Mohammed Ali',
    account: 'XXXX3321',
    lastActivity: '2026-05-01',
    signalType: 'Complete inactivity 30+ days',
    strength: 'Medium',
    status: 'Monitoring',
    timeline: [
      { date: '2026-05-01', event: 'Last recorded transaction (Utility Bill)' },
      { date: '2026-06-01', event: 'Pension credited, but no subsequent withdrawals (highly unusual)' },
    ],
    reasoning: 'Customer normally withdraws pension within 48 hours of credit. Two consecutive months of untouched pension credits flag a deviation in behavioral baseline.'
  },
  {
    id: 6,
    name: 'Rajesh Gupta',
    account: 'XXXX9904',
    lastActivity: '2026-06-30',
    signalType: 'Condolence transfers detected',
    strength: 'High',
    status: 'Alert Triggered',
    timeline: [
      { date: '2026-07-04', event: '3 inbound UPI transfers with remarks "RIP", "Om Shanti"' },
      { date: '2026-07-05', event: 'Joint account holder downloaded "Form 15G" and "Deceased Claim Form"' }
    ],
    reasoning: 'Explicit bereavement remarks on inbound transactions combined with the joint account holder accessing deceased claim forms provides high confidence of a bereavement event.'
  }
];

const getStrengthBadge = (strength) => {
  switch (strength) {
    case 'High':
      return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">High</span>;
    case 'Medium':
      return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Medium</span>;
    case 'Low':
      return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Low</span>;
    default:
      return null;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Alert Triggered':
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"><AlertCircle className="w-3 h-3 mr-1" /> Alert Triggered</span>;
    case 'Monitoring':
      return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"><Activity className="w-3 h-3 mr-1" /> Monitoring</span>;
    case 'Confirmed':
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</span>;
    default:
      return null;
  }
};

const SignalDetection = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="flex flex-col h-full relative">
      {/* Banner */}
      <div className="bg-navy-800 rounded-lg p-4 mb-6 flex items-center shadow-md border-l-4 border-softblue-300">
        <Activity className="h-6 w-6 text-softblue-300 mr-3" />
        <p className="text-white font-medium">
          AI Agent is actively monitoring <span className="text-softblue-200 font-bold">1,24,832</span> accounts for bereavement signals.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Signal Detection Engine</h1>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-300 sm:rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Customer Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Account</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Activity</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Signal Type</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Strength</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockSignals.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{item.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{item.account}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.lastActivity}</td>
                <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{item.signalType}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getStrengthBadge(item.strength)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getStatusBadge(item.status)}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => setSelectedCase(item)}
                    className="text-navy-600 hover:text-navy-900 font-semibold flex items-center justify-end w-full"
                  >
                    Review Case <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Panel Modal */}
      {selectedCase && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedCase(null)} />
          <section className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md transform transition-transform ease-in-out duration-500 flex flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-navy-900 text-white">
                <h2 className="text-lg font-medium">Case Review: {selectedCase.name}</h2>
                <button
                  type="button"
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                  onClick={() => setSelectedCase(null)}
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Account: {selectedCase.account}</p>
                    <div className="mt-2 flex space-x-2">
                      {getStrengthBadge(selectedCase.strength)}
                      {getStatusBadge(selectedCase.status)}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-navy-600" />
                    Agent Reasoning
                  </h3>
                  <div className="bg-softblue-50 rounded-lg p-4 border border-softblue-100">
                    <p className="text-sm text-navy-800 leading-relaxed">
                      {selectedCase.reasoning}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Signal Timeline</h3>
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {selectedCase.timeline.map((event, eventIdx) => (
                        <li key={eventIdx}>
                          <div className="relative pb-8">
                            {eventIdx !== selectedCase.timeline.length - 1 ? (
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-navy-100 flex items-center justify-center ring-8 ring-white">
                                  <Activity className="h-4 w-4 text-navy-600" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                <div>
                                  <p className="text-sm text-gray-500">{event.event}</p>
                                </div>
                                <div className="whitespace-nowrap text-right text-xs font-medium text-gray-500">
                                  {event.date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col space-y-3">
                <button
                  type="button"
                  className="w-full flex justify-center items-center rounded-md bg-navy-800 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Case — Initiate Bereavement Protocol
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="w-full rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Dismiss Signal
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SignalDetection;
