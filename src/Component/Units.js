import React, { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import BillingCards from "./BillingCards";
import LineChartUnit from "./LineChartUnit";
import CustomLegend from "./CustomLegend";
import { useChartData } from "../context/ChartDataProvider";
import AskingRate from "./AskingRate";

const MINES = [
  "SUDRA MINES",
  "KENDADIH MINE",
  "Mines O/C",
  "Mines U/G",
  "KHETRI",
  "BANWAS",
  "KOLIHAN",
];

const Dashboard = () => {
  const { setDepartment } = useChartData();

  // useEffect(() => {
  //   setDepartment("Mining")
  // }, [])

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {/* <div className="unitsContainer">
          <BillingCards type={"Unit"} />
          <div
            className="production border mt-2 rounded-lg w-full flex flex-row"
            style={{ backgroundColor: "#e3e3e3" }}
          >
            <div className="w-1/2 mt-2">
              <p className="font-semibold mx-2 text-center">Ore Production</p>
              <div className="flex flex-row p-2  ">
                <LineChartUnit />
              </div>
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
              />
            </div>
            <div className="">
              <div className="flex justify-end h-10 mt-2">
                <select name="" id="" className="minesDropdown">
                  {MINES.map((mine) => (
                    <option key={mine} value={mine}>
                      {mine}
                    </option>
                  ))}
                </select>
              </div>
              <AskingRate val={9758} />
            </div>

            <div className="w-1/2 mt-2">
              <p className="font-semibold mx-32 text-center">MIC Production</p>
              <div className="flex p-2 justify-center items-center">
                <LineChartUnit />
              </div>
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
              />
            </div>
            <div style={{ marginTop: 52 }}>
              <AskingRate val={6654} />
            </div>
          </div>

          <div
            className="exploration border mt-2 rounded-lg w-full flex flex-row"
            style={{ backgroundColor: "#e3e3e3" }}
          >
            <div className="w-1/2 mt-2">
              <p className="font-semibold mx-2 text-center">Drilling Surface</p>
              <div className="flex flex-row p-2  ">
                <LineChartUnit />
              </div>
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
              />
            </div>
            <AskingRate val={7685} />
            <div className="w-1/2 mt-2">
              <p className="font-semibold mx-32 text-center">
                Drilling Sub Surface
              </p>
              <div className="flex p-2 justify-center items-center">
                <LineChartUnit />
              </div>
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
              />
            </div>
            <AskingRate val={5654} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
