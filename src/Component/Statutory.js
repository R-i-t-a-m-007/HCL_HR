// Statutory.js

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar'; 
import Sidebar from './Sidebar/Sidebar';
import ContractBillingCards from './ContractBillingCards';
import DataTable from './StatutoryTable';
import axios from 'axios';
import { useChartData } from '../context/ChartDataProvider';

const statutoryApi = "http://localhost:5000/get_mine_statutory";
const latest_etl_date_api = "http://localhost:5000/get_statutory_latest_etl_date";
const MINES = ["Malanjkhand", "Khetri", "Kolihan", "Surda", "Kendadih", "Rakha"];

const Statutory = () => {

  const { setDepartment } = useChartData();

  const [latestEtlDate, setLatestEtlDate] = useState("")
  
  const fetchLatestEtlDate = async () => {
    await axios.get(latest_etl_date_api).then((response) => {
      if (response) {
        const data = response.data;
        setLatestEtlDate(data[0].date)
      }
    });
  };

  useEffect(() => {
    setDepartment("Statutory");
    fetchLatestEtlDate();
  }, []);

  const [selectedMine, setSelectedMine] = useState(MINES[0]);
  const [mineData, setMineData] = useState({});

  const handleSelectMine = (mineName) => {
    setSelectedMine(mineName)
  }

  const fetchMineData = async () => {
    let endpoint = `${statutoryApi}?mine=${selectedMine}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0];
        setMineData({
            // "mine": data["mine"], 
            "initial_lease_grant_date": data["initial_lease_grant_date"], 
            "mine_lease_validity_till": data["mine_lease_validity_till"], 
            "balance_(days)": data["balance_(days)"],
            "balance_(years)": data["balance_(years)"], 
            "alert_type": data["alert_type"], 
            "renewal_status": data["renewal_status"], 
            "ml_deed_execution": data["ml_deed_execution"],
            "ml_area_(ha)": data["ml_area_(ha)"], 
            "forest_area_(ha)": data["forest_area_(ha)"], 
            "fc_stage-II_granted_on": data["fc_stage-II_granted_on"], 
            "fc_valid_till": data["fc_valid_till"],
            "balance_(days)_1": data["balance_(days)_1"],
            "balance_(years)_1": data["balance_(years)_1"], 
            "alert_type_1": data["alert_type_1"], 
            "stage-II_approval_(ha)": data["stage-II_approval_(ha)"],
            "npv_paid_area_(ha)": data["npv_paid_area_(ha)"], 
            "mining_plan": data["mining_plan"], 
            "renewal_status_1": data["renewal_status_1"], 
            "balance_(days)_2": data["balance_(days)_2"],
            "balance_(years)_2": data["balance_(years)_2"], 
            "alert_type_2": data["alert_type_2"], 
            "ec_capacity": data["ec_capacity"], 
            "ec_granted_on": data["ec_granted_on"],
            "ec_valid_till": data["ec_valid_till"], 
            "ec_renewal_status": data["ec_renewal_status"],
            "balance_(days)_3": data["balance_(days)_3"], 
            "balance_(years)_3": data["balance_(years)_3"], 
            "alert_type_3": data["alert_type_3"], 
            "wildlife_clearance": data["wildlife_clearance"],
            "cgwa_noc": data["cgwa_noc"], 
            "alert_type_4": data["alert_type_4"], 
            "cgwa_noc_status": data["cgwa_noc_status"], 
            "cte": data["cte"],
            "cto": data["cto"], 
            "conc._plant_ec": data["conc._plant_ec"],
            "conc._plant_ec_capacity": data["conc._plant_ec_capacity"], 
            "alert_type_5": data["alert_type_5"], 
            "conc._plant_cte": data["conc._plant_cte"], 
            "conc._plant_cto": data["conc._plant_cto"],
            "conc._plant_cto_capacity": data["conc._plant_cto_capacity"], 
            "alert_type_6": data["alert_type_6"],
        });
        }
    });
  }

  useEffect(() => {
    fetchMineData();
  }, [selectedMine])

  return (
    <div className='h-screen w-full flex'>
      <Sidebar />

      <div className='w-full'>
        <Navbar etlDate={latestEtlDate} />

        <div className="dashboardContainer flex flex-col">
          <ContractBillingCards />
          
          <div className="flex mt-4">
            {
              MINES.map(mine =>
                <button 
                  key={mine} 
                  className={`blueButton ${selectedMine === mine ? 'selected' : undefined}`}
                  onClick={() => handleSelectMine(mine)}
                >
                  {mine}
                </button>
              )
            }
          </div>

        </div>
        <DataTable data={mineData} />
       
      </div>
      
    </div>
  );
}

export default Statutory;