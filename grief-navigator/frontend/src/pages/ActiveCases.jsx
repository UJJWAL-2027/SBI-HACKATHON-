import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Clock, MessageSquare, X, Send, FileText } from 'lucide-react';

const workflowSteps = [
  { id: 1, name: 'Family Notification Sent (WhatsApp + SMS)' },
  { id: 2, name: 'Nominee Identity Verification', requiresDocs: true },
  { id: 3, name: 'Death Certificate Submission', requiresDocs: true },
  { id: 4, name: 'FD Transmission Initiated' },
  { id: 5, name: 'Joint Account Status Updated' },
  { id: 6, name: 'Insurance Claim Filed', requiresDocs: true },
  { id: 7, name: 'Succession Certificate Requested', conditional: true },
  { id: 8, name: 'Final Settlement Complete' }
];

const mockCases = [
  {
    id: 'C-82941',
    deceasedName: 'Ramesh Krishnan',
    account: 'XXXX4921',
    dateOpened: '2026-07-01',
    nominee: { name: 'Priya Krishnan', relationship: 'Daughter', phone: '+91 98765 43210' },
    progress: 35,
    currentStepId: 3,
    steps: [
      { stepId: 1, status: 'completed', date: '2026-07-02' },
      { stepId: 2, status: 'completed', date: '2026-07-03' },
      { stepId: 3, status: 'in-progress', expectedDate: 'Awaiting Upload' },
      { stepId: 4, status: 'pending' },
      { stepId: 5, status: 'pending' },
      { stepId: 6, status: 'pending' },
      { stepId: 7, status: 'pending' },
      { stepId: 8, status: 'pending' }
    ]
  },
  {
    id: 'C-82902',
    deceasedName: 'Amitabh Verma',
    account: 'XXXX1198',
    dateOpened: '2026-06-20',
    nominee: { name: 'Sunita Verma', relationship: 'Wife', phone: '+91 87654 32109' },
    progress: 75,
    currentStepId: 6,
    steps: [
      { stepId: 1, status: 'completed', date: '2026-06-21' },
      { stepId: 2, status: 'completed', date: '2026-06-22' },
      { stepId: 3, status: 'completed', date: '2026-06-24' },
      { stepId: 4, status: 'completed', date: '2026-06-26' },
      { stepId: 5, status: 'completed', date: '2026-06-28' },
      { stepId: 6, status: 'in-progress', expectedDate: 'Filing with LIC' },
      { stepId: 7, status: 'pending' },
      { stepId: 8, status: 'pending' }
    ]
  },
  {
    id: 'C-82989',
    deceasedName: 'Lata Patel',
    account: 'XXXX7743',
    dateOpened: '2026-07-04',
    nominee: { name: 'Rahul Patel', relationship: 'Son', phone: '+91 76543 21098' },
    progress: 10,
    currentStepId: 2,
    steps: [
      { stepId: 1, status: 'completed', date: '2026-07-04' },
      { stepId: 2, status: 'in-progress', expectedDate: 'Awaiting KYC link click' },
      { stepId: 3, status: 'pending' },
      { stepId: 4, status: 'pending' },
      { stepId: 5, status: 'pending' },
      { stepId: 6, status: 'pending' },
      { stepId: 7, status: 'pending' },
      { stepId: 8, status: 'pending' }
    ]
  }
];

const ActiveCases = () => {
  const [expandedCase, setExpandedCase] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const openContactModal = (e, nominee, deceasedName) => {
    e.stopPropagation();
    setSelectedNominee({ ...nominee, deceasedName });
    setContactModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Active Bereavement Cases</h1>
        <p className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          Showing 3 of 128 Active Cases
        </p>
      </div>

      <div className="space-y-4">
        {mockCases.map((caseItem) => {
          const isExpanded = expandedCase === caseItem.id;
          const currentStepInfo = workflowSteps.find(s => s.id === caseItem.currentStepId);
          
          return (
            <div key={caseItem.id} className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${isExpanded ? 'border-navy-500 ring-1 ring-navy-500' : 'border-gray-200 hover:border-navy-300'}`}>
              {/* Card Header (Summary) */}
              <div 
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between"
                onClick={() => toggleExpand(caseItem.id)}
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{caseItem.deceasedName}</h3>
                      <p className="text-sm font-mono text-gray-500">Account: {caseItem.account} • Case ID: {caseItem.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Opened: {caseItem.dateOpened}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-3 bg-gray-50 inline-flex px-3 py-1.5 rounded-md border border-gray-100">
                    <span className="font-medium mr-2">Nominee:</span> {caseItem.nominee.name} ({caseItem.nominee.relationship})
                  </div>
                </div>

                <div className="flex-1 md:px-8 flex flex-col justify-center">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-navy-800">Overall Progress</span>
                    <span className="font-bold text-navy-600">{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-softblue-300 h-2.5 rounded-full transition-all duration-500" style={{ width: `${caseItem.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    <span className="font-semibold text-navy-700">Current Step:</span> {currentStepInfo?.name}
                  </p>
                </div>

                <div className="flex items-center justify-end md:ml-4 gap-3 mt-4 md:mt-0">
                  <button
                    onClick={(e) => openContactModal(e, caseItem.nominee, caseItem.deceasedName)}
                    className="flex items-center justify-center px-4 py-2 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Contact Family
                  </button>
                  <button className="p-2 text-gray-400 hover:text-navy-600 bg-gray-50 rounded-full">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded View (Workflow Pipeline) */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-6 rounded-b-xl">
                  <h4 className="text-sm font-bold text-navy-900 mb-6 uppercase tracking-wider">Succession Workflow Pipeline</h4>
                  <div className="relative">
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <ul className="space-y-6 relative">
                      {workflowSteps.map((step, idx) => {
                        const stepData = caseItem.steps.find(s => s.stepId === step.id) || { status: 'pending' };
                        const isCompleted = stepData.status === 'completed';
                        const isInProgress = stepData.status === 'in-progress';
                        
                        return (
                          <li key={step.id} className="relative pl-10 flex items-start group">
                            {/* Icon */}
                            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-gray-50
                              ${isCompleted ? 'bg-green-100' : isInProgress ? 'bg-softblue-100' : 'bg-white border border-gray-300'}`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : isInProgress ? (
                                <Clock className="w-4 h-4 text-softblue-300" />
                              ) : (
                                <Circle className="w-3 h-3 text-gray-300" />
                              )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between min-w-0 pb-1 pt-1">
                              <div>
                                <p className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : isInProgress ? 'text-navy-700 font-bold' : 'text-gray-500'}`}>
                                  {step.id}. {step.name}
                                </p>
                                {step.requiresDocs && (
                                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 mt-1">
                                    <FileText className="w-3 h-3 mr-1" /> Documents Required
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 sm:mt-0 text-right">
                                {isCompleted && <span className="text-xs text-green-600 font-medium">Completed on {stepData.date}</span>}
                                {isInProgress && <span className="text-xs text-softblue-300 font-medium italic animate-pulse">{stepData.expectedDate}</span>}
                                {stepData.status === 'pending' && <span className="text-xs text-gray-400">Pending</span>}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Modal */}
      {contactModalOpen && selectedNominee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setContactModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 font-bold text-lg">
                  {selectedNominee.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-tight">{selectedNominee.name}</h3>
                  <p className="text-xs text-white/70">{selectedNominee.phone}</p>
                </div>
              </div>
              <button onClick={() => setContactModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="bg-[#e5ddd5] p-4 flex-1 overflow-y-auto" style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')", backgroundOpacity: 0.1 }}>
              <div className="flex justify-center mb-4">
                <span className="bg-[#e1f3fb] text-[#4a5f68] text-xs px-3 py-1 rounded-lg shadow-sm">Today</span>
              </div>
              
              {/* Mock System Message */}
              <div className="flex justify-end mb-2">
                <div className="bg-[#dcf8c6] rounded-lg p-3 max-w-[85%] shadow-sm relative">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    Dear {selectedNominee.name},
                    <br/><br/>
                    We at SBI offer our deepest condolences on the passing of {selectedNominee.deceasedName}. We know this is a difficult time.
                    <br/><br/>
                    To save you a trip to the branch, we have proactively initiated the succession workflow for account XXXX.
                    <br/><br/>
                    When you are ready, please click the secure link below to upload the death certificate. There is no rush.
                    <br/><br/>
                    Link: https://sbi.co.in/secure/gn/req-8294
                    <br/><br/>
                    We are here for you.
                  </p>
                  <span className="text-[10px] text-gray-500 float-right mt-1 ml-2">10:42 AM</span>
                </div>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                Type a message...
              </div>
              <button className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-sm hover:bg-[#008f6f]">
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCases;
