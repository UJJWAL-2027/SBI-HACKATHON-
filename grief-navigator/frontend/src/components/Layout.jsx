import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AgentActivityLog from './AgentActivityLog';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
        <AgentActivityLog />
      </div>
    </div>
  );
};

export default Layout;
