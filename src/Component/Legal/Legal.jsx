import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import legal_ui from './../../assets/Legal_wireframe.jpg';
import { useChartData } from '../../context/ChartDataProvider';

export const Legal = () => {
  const { setDepartment } = useChartData();
  useEffect(() => {
    setDepartment("Legal");
  }, []);
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <Sidebar />

      <div className="w-full">
        <Navbar navBtn="HR Dashboard" redirectTo="/hr" />

        <div 
          className="legalDashboardContainer w-auto h-full object-contain bg-no-repeat bg-contain"
          style={{backgroundImage: `url(${legal_ui})`, marginLeft: 205, backgroundColor: "white", marginTop: 80, marginRight: 0}}
        >
            
        </div>
      </div>
    </div>
  )
}
