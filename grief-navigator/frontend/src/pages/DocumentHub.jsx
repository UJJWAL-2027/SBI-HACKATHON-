import { useState } from 'react';
import { Search, FileText, CheckCircle2, Clock, XCircle, Upload, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

const mockCases = [
  {
    id: 'C-82941',
    deceasedName: 'Ramesh Krishnan',
    nominee: 'Priya Krishnan',
    account: 'XXXX4921',
    progress: '6/8 Documents',
    documents: [
      { id: 'd1', name: 'Death Certificate', status: 'Received', uploadDate: '2026-07-02' },
      { id: 'd2', name: 'Nominee Aadhaar Card', status: 'Received', uploadDate: '2026-07-02', hasError: true },
      { id: 'd3', name: 'Nominee PAN Card', status: 'Received', uploadDate: '2026-07-02' },
      { id: 'd4', name: 'Passbook / Account Statement', status: 'Received', uploadDate: '2026-07-03' },
      { id: 'd5', name: 'Succession Certificate', status: 'Not Required' },
      { id: 'd6', name: 'Insurance Claim Form (SBI Life)', status: 'Pending' },
      { id: 'd7', name: 'Fixed Deposit Receipts', status: 'Pending' },
      { id: 'd8', name: 'Joint Account Holder Consent', status: 'Not Required' },
    ]
  },
  {
    id: 'C-82902',
    deceasedName: 'Amitabh Verma',
    nominee: 'Sunita Verma',
    account: 'XXXX1198',
    progress: '8/8 Documents',
    documents: [
      { id: 'd1', name: 'Death Certificate', status: 'Received', uploadDate: '2026-06-21' },
      { id: 'd2', name: 'Nominee Aadhaar Card', status: 'Received', uploadDate: '2026-06-22' },
      { id: 'd3', name: 'Nominee PAN Card', status: 'Received', uploadDate: '2026-06-22' },
      { id: 'd4', name: 'Passbook / Account Statement', status: 'Received', uploadDate: '2026-06-24' },
      { id: 'd5', name: 'Succession Certificate', status: 'Received', uploadDate: '2026-06-28' },
      { id: 'd6', name: 'Insurance Claim Form (SBI Life)', status: 'Received', uploadDate: '2026-06-29' },
      { id: 'd7', name: 'Fixed Deposit Receipts', status: 'Received', uploadDate: '2026-06-25' },
      { id: 'd8', name: 'Joint Account Holder Consent', status: 'Not Required' },
    ]
  },
  {
    id: 'C-82989',
    deceasedName: 'Lata Patel',
    nominee: 'Rahul Patel',
    account: 'XXXX7743',
    progress: '1/8 Documents',
    documents: [
      { id: 'd1', name: 'Death Certificate', status: 'Received', uploadDate: '2026-07-05' },
      { id: 'd2', name: 'Nominee Aadhaar Card', status: 'Pending' },
      { id: 'd3', name: 'Nominee PAN Card', status: 'Pending' },
      { id: 'd4', name: 'Passbook / Account Statement', status: 'Pending' },
      { id: 'd5', name: 'Succession Certificate', status: 'Pending' },
      { id: 'd6', name: 'Insurance Claim Form (SBI Life)', status: 'Not Required' },
      { id: 'd7', name: 'Fixed Deposit Receipts', status: 'Not Required' },
      { id: 'd8', name: 'Joint Account Holder Consent', status: 'Not Required' },
    ]
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Received':
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Received</span>;
    case 'Pending':
      return <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
    case 'Not Required':
      return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"><XCircle className="w-3 h-3 mr-1" /> Not Required</span>;
    default:
      return null;
  }
};

const DocumentHub = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(mockCases[0].id);
  
  const selectedCase = mockCases.find(c => c.id === selectedCaseId);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Document Hub</h1>
        <p className="text-gray-500 text-sm mt-1">Review and verify documentation for active bereavement workflows.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 h-[calc(100vh-140px)]">
        {/* Left Panel: Cases List */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-2 pl-9 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-navy-600 sm:text-sm sm:leading-6"
                placeholder="Search cases or names..."
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {mockCases.map((c) => (
                <li 
                  key={c.id} 
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCaseId === c.id ? 'bg-softblue-50 border-l-4 border-navy-600' : 'border-l-4 border-transparent'}`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-navy-900">{c.deceasedName}</span>
                    <span className="text-xs font-mono text-gray-500">{c.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Nominee: {c.nominee}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">{c.progress}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel: Document Checklist */}
        <div className="w-full lg:w-2/3 flex flex-col h-full overflow-hidden">
          {/* AI Checker Banner (shows only for the first case which has the error) */}
          {selectedCase.id === 'C-82941' && (
            <div className="mb-4 rounded-xl bg-amber-50 p-4 border border-amber-200 shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-amber-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-amber-800">AI Document Checker</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>Agent has verified 4 of 6 documents. <strong className="font-bold">1 document has a mismatch</strong> — Nominee name spelling on Aadhaar ("Priya Krishan") differs from account records ("Priya Krishnan"). Flagged for manual review.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-navy-900 text-white flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-lg font-semibold">{selectedCase.deceasedName} — Documents</h2>
                <p className="text-sm text-gray-300">Account: {selectedCase.account}</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                  Request Missing Docs
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedCase.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            {doc.hasError && (
                              <div className="text-xs text-amber-600 flex items-center mt-1">
                                <AlertTriangle className="w-3 h-3 mr-1" /> Name Mismatch
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.uploadDate || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {doc.status === 'Received' && (
                          <button className="text-navy-600 hover:text-navy-900 flex items-center justify-end w-full bg-navy-50 px-3 py-1.5 rounded-md transition-colors">
                            <Eye className="w-4 h-4 mr-1.5" /> View
                          </button>
                        )}
                        {doc.status === 'Pending' && (
                          <button className="text-gray-600 hover:text-navy-900 flex items-center justify-end w-full border border-gray-300 bg-white px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                            <Upload className="w-4 h-4 mr-1.5" /> Upload
                          </button>
                        )}
                        {doc.status === 'Not Required' && (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHub;
