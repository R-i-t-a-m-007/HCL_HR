import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useChartData } from "../../context/ChartDataProvider";
import { Cards } from "./Cards/Cards";
import { CompPerPosition } from "./EmpComposition/CompPerPosition/CompPerPosition";
import Manpower from "./Manpower/Manpower";
import { CompPerDepartment } from "./EmpComposition/CompPerDepartment/CompPerDepartment";
import { ManpowerUnit } from "./ManpowerUnit/ManpowerUnit";
import OverallEmployeeComp from "./EmployeePerUnit/OverallEmployeeComp";
import OverallMonth from "./EmployeePerUnit/OverallMonth";
import { CompPerGrade } from "./EmpComposition/CompPerGrade/CompPerGrade";
import { CustomDropdown } from "../CustomDropdown";
import { useUserData } from "../../context/UserDataProvider";
import { Backdrop, CircularProgress } from "@mui/material";

export const HRDashboard = () => {
  const { setDepartment, UNITS } = useChartData();

  const { hasAccess, loading } = useUserData();
  const hasUserAccess = hasAccess("Human Resource");

  useEffect(() => {
    setDepartment("HR");
  }, []);

  const [selectedUnit, setSelectedUnit] = useState(UNITS[0]);
  return (
    <div className="h-screen w-full flex">
      <Sidebar />

      <div className="w-full" style={{ backgroundColor: "#0020600f" }}>
        {/* <Navbar navBtn="Legal Dashboard" redirectTo="/legal" /> */}
        <Navbar />

        <div className="hrDashboardContainer h-full w-auto flex-col">
          {hasUserAccess ? (
            <>
              <div className="flex justify-between gap-4 mb-2">
                <div className="w-full">
                  <div className="1">
                    <Cards />
                  </div>
                  <div className="3 flex gap-2">
                    <CompPerGrade />
                    <CompPerPosition />
                    <CompPerDepartment />
                  </div>
                </div>
                <div className="2">
                  <Manpower />
                </div>
              </div>
              <div className="4 flex flex-col gap-3 pt-1">
                <CustomDropdown
                  className="minesDropdown shifts min-w-[113px_!important] py-[6px_!important] bg-white"
                  value={selectedUnit}
                  setter={setSelectedUnit}
                  options={UNITS}
                  type="normal"
                />
                <div className="flex gap-2">
                  <OverallMonth unit={selectedUnit} />
                  <OverallEmployeeComp unit={selectedUnit} />
                  <ManpowerUnit unit={selectedUnit} />
                </div>
              </div>
            </>
          ) : loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <h2>Access denied</h2>
          )}
        </div>
      </div>
    </div>
  );
};
