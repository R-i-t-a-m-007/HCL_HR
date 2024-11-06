import React, { useEffect } from "react";
import explorationPng from "./../../assets/Explorration.jpg";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useChartData } from "../../context/ChartDataProvider";
import { CustomCard } from "../CustomCard";
import { Registration } from "../Authentication/Registration";
import { StatsSection } from "./ExplorationStats/StatsSection";
import { ExplorationCards } from "./Cards/ExplorationCards";
import { ExplorationDropdowns } from "./Dropdowns/ExplorationDropdowns";
import { useUserData } from "../../context/UserDataProvider";
import { DateInfo } from "./DateInfo";
import { useExplorationData } from "../../context/ExplorationDataProvider";
import { CustomBackdrop } from "../CustomBackdrop";

const manualETLApi = "http://localhost:5000/exploration_manual_etl";

export const ExplorationDashboard = () => {
  const { setDepartment } = useChartData();

  const { hasAccess } = useUserData();
  const hasUserAccess = hasAccess("Explorations");

  // const { latestEtlDate, loading } = useExplorationData();

  useEffect(() => {
    setDepartment("Exploration");
  }, []);
  return (
    <div className="h-screen w-full flex bg-[#0020600f] overflow-scroll">
      <Sidebar />

      <div className="w-full">
        {/* <Navbar etlDate={latestEtlDate} manualETLApi={manualETLApi} />

        <div className="exploDashboardContainer h-full w-auto flex flex-col">
          {hasUserAccess ? (
            loading ? (
              <CustomBackdrop open={loading} />
            ) : (
              <>
                <div className="flex justify-between">
                  <ExplorationDropdowns />
                  <DateInfo />
                </div>
                <ExplorationCards />
                <StatsSection />
              </>
            )
          ) : (
            <h2>Access denied</h2>
          )}
        </div> */}
      </div>
    </div>
  );
};
