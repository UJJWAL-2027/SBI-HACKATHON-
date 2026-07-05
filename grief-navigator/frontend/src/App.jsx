import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SignalDetection from './pages/SignalDetection';
import ActiveCases from './pages/ActiveCases';
import DocumentHub from './pages/DocumentHub';
import ReengagementQueue from './pages/ReengagementQueue';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="signals" element={<SignalDetection />} />
          <Route path="cases" element={<ActiveCases />} />
          <Route path="documents" element={<DocumentHub />} />
          <Route path="reengagement" element={<ReengagementQueue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
