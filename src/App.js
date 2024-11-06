import './App.css';
import Dashboard from './Component/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Statistics from './Component/Statistics';
import Reports from './Component/Reports';
import Units from './Component/Units';
import Contracts from './Component/Contracts';
import Finance from './Component/Finance';
import Progress from './Component/ProgressDashboard/Progress';
import Statutory from './Component/Statutory';
import { HRDashboard } from './Component/HR/HRDashboard';
import { ExplorationDashboard } from './Component/Exploration/ExplorationDashboard';
import { SalesDashboard } from './Component/Sales/SalesDashboard';
import { Legal } from './Component/Legal/Legal';
import AdminTable from './Component/Admin/AdminTable';
import LoginForm from './Component/Authentication/LoginForm';
import { SignInPage } from './Component/Authentication/SignInPage';
import AdminForm from './Component/Admin/AdminForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='h-screen w-full'>
     
     <Routes>
      <Route  path="/productions" element={<Dashboard/>} />
      <Route path="/statutory" element={<Statutory />} />
      <Route  path="/m&c" element={<Contracts/>} />
      <Route  path="/statistics" element={<Statistics/>} />
      <Route  path="/reports" element={<Reports/>} />
      <Route path="/units" element={<Units />} />
      <Route path="/" element={<SignInPage />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/contractsmonitoring" element={<Progress />} />
      <Route path="/hr" element={<HRDashboard />} />
      <Route path="/exploration" element={<ExplorationDashboard />} />
      <Route path="/sales" element={<SalesDashboard />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/adminTable" element={<AdminTable/>}/>
      <Route path="/user" element={<AdminForm/>}/>
     </Routes >
     <ToastContainer position='bottom-left' autoClose={2000} />

    </div>
  );
}

export default App;
