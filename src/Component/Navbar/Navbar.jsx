import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { useChartData } from '../../context/ChartDataProvider';
import { LogoContainer } from '../LogoContainer';
import "./Navbar.css"
import { DateCard } from '../DateCard';
import { NavigationBtn } from '../NavigationBtn';
import axios from 'axios';

const lmeLink = "https://www.westmetall.com/en/markdaten.php";

const HEADERS = {
  Mining: "Mines Development & Production Dashboard",
  Finance: "Mines Finance Dashboard",
  Geology: "Diamond Drill Performance Dashboard",
  Progress: "Mines Progress Data",
  Statutory: "Mines Statutory Updates",
  Sales: "Sales Dashboard",
  HR: "Human Resource Dashboard",
  Exploration: "Exploration Dashboard",
  Legal: "Legal Dashboard"
};

const Navbar = ({ etlDate, navBtn=false, redirectTo=false, manualETLApi}) => {

  const {department} = useChartData();

  const handleManualETL = async () => {
    if(!manualETLApi) return
    try {
      const response = await axios.get(manualETLApi);
      const data = response.data;
      alert(data.result);
    } catch (error) {
      console.error('Error fetching manual ETL data:', error);
    }
  };

  return (
    <div className='py-3 px-16 flex items-center justify-between navbarContainer'>
      <LogoContainer />
      <div className='font-semibold items-center headerLabel' style={{fontSize: 36}}>
         {
          HEADERS[department]
         }
      </div>

      <div className='flex items-center'>
        {
          navBtn && <NavigationBtn text={navBtn} redirectTo={redirectTo} />
        }

        <DateCard latestEtlDate={etlDate} />

        <a href={lmeLink} target='_blank' rel="noreferrer" className='lmeBtn text-white'>
          LME Price
        </a>
        
        <span className='mx-4 my-1'>
          <FaBell className='fill-yellow-300'/>
        </span>
        <button onClick={handleManualETL}>Update</button>
        <span className='mx-4 my-1'>
          <FaUser />
        </span>
        User
      </div>
    </div>
  );
};

export default Navbar;
