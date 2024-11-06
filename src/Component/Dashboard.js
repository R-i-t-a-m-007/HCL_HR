import React, { useEffect, useState } from "react";

import TwoSeriesProgressChart from "./ProgressChart"; // Add the import for TwoSeriesProgressChart

import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import BillingCards from "./BillingCards";
import BarChart1 from "./Barchart1";
import LineChart1 from "./LineChart1";
import BadgeGroup from "./BadgeGroup";
import CustomLegend from "./CustomLegend";
import UnitStatus from "./UnitStatus";
import { useChartData } from "../context/ChartDataProvider";
import axios from "axios";
import { PiTarget } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { CustomCard } from "./CustomCard";
import { Label } from "./Label";
import { useUserData } from "../context/UserDataProvider";
import { CustomBackdrop } from "./CustomBackdrop";

const CHART_WIDTH = 500;

const YEARS = ["2021", "2022", "2023", "2024"];

// api for chart 3
const yearly_unit_prod_api =
  "http://localhost:5000/get_mic_yearly_unit_prod_status";

// api for chart 6
const monthly_unit_prod_api =
  "http://localhost:5000/get_mic_monthly_unit_prod_status";

// api for chart 2
const ore_prod_api = "http://localhost:5000/get_ore_prod";

// api for chart 5
const mic_prod_api = "http://localhost:5000/get_mic_prod";

// api for chart 1
const overall_ore_prod_api = "http://localhost:5000/get_overall_ore_prod";

// api for chart 4
const overall_mic_prod_api = "http://localhost:5000/get_overall_mic_prod";

// etl date api
const latest_etl_date_api =
  "http://localhost:5000/get_dashboard_latest_etl_date";

const Dashboard = () => {
  const { hasAccess, loading } = useUserData();
  const hasUserAccess = hasAccess("Productions");

  const {
    micBadgeData,
    MINES,
    UNITS,
    setDepartment,
    performanceData_Ore,
    MONTHS,
    setYearsFromNum,
  } = useChartData();

  const [latestEtlDate, setLatestEtlDate] = useState("");

  const fetchLatestEtlDate = async () => {
    await axios.get(latest_etl_date_api).then((response) => {
      if (response) {
        const data = response.data;
        setLatestEtlDate(data[0].date);
      }
    });
  };

  const getMonthInNum = (strMonth) => {
    let mnth = (MONTHS.indexOf(strMonth) + 1).toString();
    if (mnth.length === 1) {
      return "0" + mnth;
    }
    return mnth;
  };

  const [selectedYear, setSelectedYear] = useState(YEARS[0]);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[3]);
  const [selectedMine, setSelectedMine] = useState(MINES[0]);

  const [selectedUnit, setSelectedUnit] = useState(UNITS[0]);

  const [yearlyUnitProdStatus, setYearlyUnitProdStatus] = useState([]);

  const [monthlyUnitProdStatus, setMonthlyUnitProdStatus] = useState([]);

  const [oreProdData, setOreProdData] = useState([]);
  const [micProdData, setMicProdData] = useState([]);

  const [overallOreProd, setOverallOreProd] = useState([]);
  const [overallMicProd, setOverallMicProd] = useState([]);

  const getPercentageValue = (val1, val2) => {
    if (val1 <= val2) {
      return Math.round((val1 / val2) * 100);
    }
    return Math.round((val2 / val1) * 100);
  };

  const miningBillingData = [
    {
      name: "Grade Daily (%)",
      par: "(Actual/Target)",
      actual: performanceData_Ore.Daily_progress,
      target: performanceData_Ore.Daily_target,
      val: `${performanceData_Ore.Daily_progress}/${performanceData_Ore.Daily_target}`,
      gap: getPercentageValue(
        performanceData_Ore.Daily_progress,
        performanceData_Ore.Daily_target
      ),
    },
    {
      name: "Grade Monthly (%)",
      par: "(Actual/Target)",
      actual: performanceData_Ore.Monthly_progress,
      target: performanceData_Ore.Monthly_target,
      val: `${performanceData_Ore.Monthly_progress}/${performanceData_Ore.Monthly_target}`,
      gap: getPercentageValue(
        performanceData_Ore.Monthly_progress,
        performanceData_Ore.Monthly_target
      ),
    },
    {
      name: "Grade Cum. (%)",
      par: "",
      actual: "",
      target: "",
      val: `${Math.round(performanceData_Ore.Cumulative_progress * 100)}%`,
      gap: 0,
      type: "valOnly",
    },
    {
      name: "Notification Issued",
      par: "",
      actual: "",
      target: "",
      val: "05",
      gap: 0,
      type: "valOnly",
    },
    {
      name: "Emails Sent",
      par: "",
      actual: "",
      target: "",
      val: "02",
      gap: 0,
      type: "valOnly",
    },
    {
      name: "Alerts",
      par: "",
      actual: "",
      target: "",
      val: "05",
      gap: 0,
      type: "valOnly",
    },
  ];

  useEffect(() => {
    setDepartment("Mining");
    fetchLatestEtlDate();
  }, []);

  const fetchYearlyUnitProdStatus = async () => {
    let endpoint = `${yearly_unit_prod_api}?year=${selectedYear}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data;
        setYearlyUnitProdStatus(data);
      }
    });
  };

  const fetchMonthlyUnitProdStatus = async () => {
    const month = getMonthInNum(selectedMonth);
    let endpoint = `${monthly_unit_prod_api}?year=${selectedYear}&&month=${month}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data;
        setMonthlyUnitProdStatus(data);
      }
    });
  };

  const fetchOreProd = async () => {
    let endpoint = `${ore_prod_api}?year=${selectedYear}&&mine=${selectedMine}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data;
        const transformedData = setYearsFromNum(data, "month", {
          month: 0,
          achieved: 0,
          target: 0,
        });
        setOreProdData(transformedData);
      }
    });
  };

  const fetchMicProd = async () => {
    let endpoint = `${mic_prod_api}?year=${selectedYear}&&unit=${selectedUnit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data;
        const transformedData = setYearsFromNum(data, "month", {
          month: 0,
          achieved: 0,
          target: 0,
        });
        setMicProdData(transformedData);
      }
    });
  };

  const fetchOverallOreProd = async () => {
    let endpoint = `${overall_ore_prod_api}?year=${selectedYear}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0];
        const oreBadgeData = [
          {
            name: "Target",
            val: data.target,
            icon: <PiTarget />,
            color: "#153373",
          },
          {
            name: "Achieved",
            val: data.achieved,
            icon: <BsPatchCheck />,
            color: "var(--mauve)",
          },
          {
            name: "Gap",
            val: data.gap,
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
        setOverallOreProd(oreBadgeData);
      }
    });
  };

  const fetchOverallMicProd = async () => {
    let endpoint = `${overall_mic_prod_api}?year=${selectedYear}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0];
        const micBadgeData = [
          {
            name: "Target",
            val: data.target,
            icon: <PiTarget />,
            color: "#153373",
          },
          {
            name: "Achieved",
            val: data.achieved,
            icon: <BsPatchCheck />,
            color: "var(--mauve)",
          },
          {
            name: "Gap",
            val: data.gap,
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
        setOverallMicProd(micBadgeData);
      }
    });
  };

  useEffect(() => {
    fetchYearlyUnitProdStatus();
    fetchOverallOreProd();
    fetchOverallMicProd();
  }, [selectedYear]);

  useEffect(() => {
    fetchOreProd();
  }, [selectedYear, selectedMine]);

  useEffect(() => {
    fetchMonthlyUnitProdStatus();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchMicProd();
  }, [selectedYear, selectedUnit]);

  // if(!(userName === ADMIN.name && userId === ADMIN.uid)) {
  //   return <span>Please login!</span>
  // }

  return (
    <div className="h-full w-full flex overflow-scroll bg-[#0020600f]">
      <Sidebar />

      <div className="w-full">
        <Navbar etlDate={latestEtlDate} />

        <div className="dashboardContainer flex flex-col">
          {hasUserAccess ? (
            <>
              <BillingCards
                type={"Ore"}
                miningBillingData={miningBillingData}
              />

              <div className="mainContainer">
                <div className="dashboard">
                  <div className="oreProduction space-x-3">
                    <CustomCard width={25}>
                      <Label
                        style={{ position: "unset", marginBottom: "-18px" }}
                      >
                        Overall Ore Production
                      </Label>
                      <div>
                        <BadgeGroup className="mt-10" data={overallOreProd} />
                      </div>

                      <div className="mt-6">
                        <TwoSeriesProgressChart
                          target={
                            overallOreProd && overallOreProd[0]
                              ? overallOreProd[0].val
                              : 0
                          }
                          actual={
                            overallOreProd && overallOreProd[1]
                              ? overallOreProd[1].val
                              : 0
                          }
                        />
                      </div>
                    </CustomCard>

                    <CustomCard width={35}>
                      <div className="label">
                        <Label>Ore Production</Label>
                        <div className="dropDown absolute right-[1.25rem]">
                          <select
                            name=""
                            className="minesDropdown"
                            value={selectedMine}
                            onChange={(e) => setSelectedMine(e.target.value)}
                          >
                            {MINES.map((mine) => (
                              <option key={mine} value={mine}>
                                {mine}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="graphs mt-10">
                        <div>
                          <div>
                            <BarChart1 yUnit={"Ton"} data={oreProdData} />
                          </div>
                          <CustomLegend
                            leg1={"Target"}
                            leg2={"Achieved"}
                            col1={"#153373"}
                            col2={"#ffc000"}
                          />
                        </div>
                      </div>
                    </CustomCard>

                    <div className="notificationSection">
                      <UnitStatus
                        type={"Yearly"}
                        data={yearlyUnitProdStatus}
                        options={YEARS}
                        val={selectedYear}
                        valSetter={setSelectedYear}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <CustomCard width={25}>
                      <Label
                        style={{ position: "unset", marginBottom: "-16px" }}
                      >
                        Overall MIC Production
                      </Label>
                      <div>
                        <BadgeGroup data={micBadgeData} />
                      </div>
                      <div className="mt-6">
                        <TwoSeriesProgressChart
                          target={overallMicProd[0] ? overallMicProd[0].val : 0}
                          actual={overallMicProd[1] ? overallMicProd[1].val : 0}
                        />
                      </div>
                    </CustomCard>

                    <CustomCard width={35}>
                      <div className="label">
                        <Label>MIC Production</Label>
                        <div className="dropDown absolute right-[1.25rem]">
                          <select
                            name=""
                            className="minesDropdown"
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                          >
                            {UNITS.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="graphs mt-16">
                        <div>
                          <div>
                            <LineChart1
                              yUnit={"Ton"}
                              data={micProdData}
                              param1={"target"}
                              param2={"achieved"}
                              width={CHART_WIDTH}
                            />
                          </div>
                          <CustomLegend
                            leg1={"Target"}
                            leg2={"Achieved"}
                            col1={"#153373"}
                            col2={"#ffc000"}
                          />
                        </div>
                      </div>
                    </CustomCard>

                    <div className="notificationSection">
                      <UnitStatus
                        type={"Monthly"}
                        data={monthlyUnitProdStatus}
                        options={MONTHS}
                        val={selectedMonth}
                        valSetter={setSelectedMonth}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : loading ? (
            <CustomBackdrop open={loading} />
          ) : (
            <h2>Access denied</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
