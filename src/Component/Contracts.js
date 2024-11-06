import React,{ useEffect } from "react";

import TwoSeriesProgressChart from "./ProgressChart"; // Add the import for TwoSeriesProgressChart

import Sidebar from "./Sidebar/Sidebar";
import ContractBillingCards from "./ContractBillingCards";
import BarChart2 from "./BarChart2";
import LineChart1 from "./LineChart1";
import BadgeGroup from "./BadgeGroup";
import CustomLegend from "./CustomLegend";
import { BsPatchCheck } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { PiTarget } from "react-icons/pi";
import UnitStatus from "./UnitStatus";
import LineBar from './LineBar'
import { useChartData } from '../context/ChartDataProvider'
import Navbar from "./Navbar/Navbar";



// const MINES = [
//   "SUDRA MINES",
//   "KENDADIH MINE",
//   "Mines O/C",
//   "Mines U/G",
//   "KHETRI",
//   "BANWAS",
//   "KOLIHAN",
// ];
const Unit = [
  "ICC",
  "MCP",
  "KCC",  
];

// const UNITS = ["ICC", "MCP", "KCC"];

const oreBadgeData = [
  {
    name: "Target",
    val: 1080,
    icon: <PiTarget />,
    color: "var(--color-darkgrey-theme)",
  },
  {
    name: "Achieved",
    val: 980,
    icon: <BsPatchCheck />,
    color: "var(--color-green)",
  },
  {
    name: "Gap",
    val: 380,
    icon: null,
    color: null,
  },
];

if (oreBadgeData[0].val > oreBadgeData[1].val) {
  oreBadgeData[2].icon = <AiFillCaretDown />;
  oreBadgeData[2].color = "var(--color-red)";
} else {
  oreBadgeData[2].icon = <AiFillCaretUp />;
  oreBadgeData[2].color = "green";
}

const micBadgeData = [
  {
    name: "Target",
    val: 1980,
    icon: <PiTarget />,
    color: "var(--color-darkgrey-theme)",
  },
  {
    name: "Achieved",
    val: 980,
    icon: <BsPatchCheck />,
    color: "var(--color-green)",
  },
  {
    name: "Gap",
    val: 1000,
    icon: null,
    color: null,
  },
];

if (micBadgeData[0].val > micBadgeData[1].val) {
  micBadgeData[2].icon = <AiFillCaretDown />;
  micBadgeData[2].color = "var(--color-red)";
} else {
  micBadgeData[2].icon = <AiFillCaretUp />;
  micBadgeData[2].color = "green";
}

// const MONTHLY_UNIT_STATUS = [
//   {
//     name: "KCC",
//     val: 79,
//     target: 28020,
//     achieved: 22000,
//     gap: 6020,
//   },
//   {
//     name: "MCP",
//     val: 84,
//     target: 39070,
//     achieved: 32960,
//     gap: 6110,
//   },
//   {
//     name: "ICC",
//     val: 93,
//     target: 30020,
//     achieved: 28000,
//     gap: 2020,
//   },
// ];

// const YEARLY_UNIT_STATUS = [
//   {
//     name: "KCC",
//     val: 46,
//     target: 28020 * 12,
//     achieved: 22000 * 7,
//     gap: 182240,
//   },
//   {
//     name: "MCP",
//     val: 49,
//     target: 39070 * 12,
//     achieved: 32960 * 7,
//     gap: 238120,
//   },
//   {
//     name: "ICC",
//     val: 93,
//     target: 30020 * 12,
//     achieved: 28000 * 7,
//     gap: 164240,
//   },
// ];

const Contracts = () => {
  const { setDepartment } = useChartData();

    useEffect(() => {
      setDepartment("Mining")
    }, [])
  return (
    <div className="h-screen w-full flex">
      <Sidebar />

      <div className="w-full">
        <Navbar />

        <div className="contractsContainer flex flex-col">
        <ContractBillingCards />

          <div className="mainContainer">
            <div className="dashboard">
              <div className="oreProduction statOreProduction">
              <div className='percentageChart'
                  >
                    <h2 className='text-center label'>Input Required</h2>
                    <div>
                      <BadgeGroup data={oreBadgeData} />
                    </div>
                    
                    <div>
                        <TwoSeriesProgressChart target={1080} actual={980}/>   
                    </div>
                  </div>

                <div className="productionStats">
                  <div className="label">
                    <p>Machine Wise Drilling</p>
                    <div className="dropDown">
                      <select name="" className="minesDropdown">
                        {Unit.map((mine) => (
                          <option key={mine} value={mine}>
                            {mine}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="graphs">
                    <div>
                      <div>
                      <LineBar width={485} yUnit={"USD"} />
                      </div>
                      <CustomLegend
                        leg1={"Achieved"}
                        leg2={"Projected "}
                        col1={"#153373"}
                        col2={"#ffc000"}
                      />
                    </div>
                  </div>
                </div>

                <div className="notificationSection">
                  {/* <UnitStatus type={"Monthly"} data={MONTHLY_UNIT_STATUS} /> */}
                  <div
                    className="unitStatus mb-4 h-full "
                    style={{ width: "540px" }}
                  >
                       <div className="label">
                    <p>Breakdown Hours (Machine Wise)</p>
                    <div className="dropDown flex justify-end" >
                      <select name="" className="minesDropdown">
                        {Unit.map((mine) => (
                          <option key={mine} value={mine}>
                            {mine}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                    <div className=" flex justify-evenly  mt-12 ">
                      <BarChart2 yUnit={"Ton"} />
                    </div>
                    <CustomLegend
                      leg1={"M/B"}
                      leg2={"M/B-HCL"}
                      leg3={"M/B-Contract"}
                      col1={"#153373"}
                      col2={"var(--color-theme-grey)"}
                      col3={"#ffc000"}
                    />
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
