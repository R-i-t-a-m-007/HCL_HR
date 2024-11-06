import React, { useEffect } from 'react';
import salesPng from './../../assets/Sales_wireframe.jpg'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useChartData } from '../../context/ChartDataProvider';
import CopperGrade from './Stats/ProductionStat/CopperGrade';
import MoistureContent from './Stats/ProductionStat/MoistureContent';
import ProductionQuantity from './Stats/ProductionStat/ProductionQuantity';

export const SalesDashboard = () => {
  const { setDepartment } = useChartData();
  useEffect(() => {
    setDepartment("Sales");
  }, []);
  return (
     <div className="h-screen w-full flex bg-[#0020600f] overflow-scroll">
     <Sidebar />

     <div className="w-full">
       <Navbar />

       <div className="salesDashboardContainer  h-full w-auto flex flex-col " >
          <div className='flex gap-2'>
            <CopperGrade/>
         
            <ProductionQuantity/>
          </div>
     </div>
   </div>
   </div>
  )
}
