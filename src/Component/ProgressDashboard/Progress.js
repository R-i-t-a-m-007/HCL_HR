import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import ContractBillingCards from "../ContractBillingCards";
import { useChartData } from "../../context/ChartDataProvider";
import { DropdownGroups } from "./components/DropdownGroups";
import { Statistics } from "./components/Statistics";
import Chart from "../GanttChart/Chart";
import axios from "axios";

const latest_etl_date_api = "http://localhost:5000/get_progress_latest_etl_date";

const Progress = () => {
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
    setDepartment("Progress");
    fetchLatestEtlDate()
  }, []);
  
  return (
    <div className="h-screen w-full flex bg-[#0020600f]">
      <Sidebar />

      <div className="w-full">
        <Navbar etlDate={latestEtlDate} />

        <div className="progressContainer flex flex-col">
          <ContractBillingCards />

          <div>
            <DropdownGroups />

            <Statistics />
            
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
