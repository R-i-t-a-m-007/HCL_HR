import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import { PiTarget } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
const ChartDataContext = createContext();

export const useChartData = () => useContext(ChartDataContext);

const HR_POSITIONS = [
  {
    name: "Executive",
    type: "single"
  },
  {
    name: "Non-Executive",
    subOptions: ["Technical", "Non-Technical"],
    type: "menu"
  }
]

const FINANCIAL_YEARS = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const setYearsFromNum = (data, monthKey, emptyData) => {
  let k = 0;
  let transformedData= [];
  let idx = 0;

  while(idx<12 && k < data.length) {
    let d = data[k];
    let monthNum = parseInt(d[monthKey], 10)-1;
    let reqData = {};
    if(monthNum === idx) {
      k++;
      reqData = d;
    } else {
      reqData = emptyData;
    }
    transformedData.push({
      ...reqData,
      [monthKey]: MONTHS[idx]
    });
    idx++;
  }
  while(idx < 12) {
    transformedData.push({
      ...emptyData,
      [monthKey]: MONTHS[idx]
    });
    idx++;
  }
  return transformedData;
}

const ADMIN = {
  name: "admin",
  uid: "admin"
};

const UNITS_MINES = {
  ICC: ["SUDRA MINES", "KENDADIH MINE"],
  MCP: ["Mines O/C", "Mines U/C"],
  KCC: ["KHETRI", "BANWAS", "KOLIHAN"],
};

const MINES = [
  // "MINES",
  "SUDRA MINES",
  "KENDADIH MINE",
  "Mines O/C",
  "Mines U/C",
  "KHETRI",
  "BANWAS",
  "KOLIHAN",
];
const UNITS = [
  // "UNITS",
  "ICC",
  "MCP",
  "KCC",
];

const DRILLING_TYPES = [
  "Under Ground Drilling",
  "Surface Drilling",
];

const CONTRACTS = [
  "M/s MPS Engineering, Rajasthan",
  "M/s SKS,Nagpur",
  "M/s PPT Engineering, Rajasthan",
  "M/s South North Pinnacle Expl. Ltd."
,
];

const DEPARTMENTS = ["Production", "Human Resource", "Explorations", "Finance", "Statutory"];

const oreBadgeData = [
  {
    name: "Target",
    val: 1080,
    icon: <PiTarget />,
    color: "var(--color-theme-grey)",
  },
  {
    name: "Achieved",
    val: 980,
    icon: <BsPatchCheck />,
    color: "var(--color-theme-blue)",
  },
  {
    name: "Gap",
    val: 1080 - 980,
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
    color: "#153373",
  },
  {
    name: "Achieved",
    val: 980,
    icon: <BsPatchCheck />,
    color: "var(--color-theme-grey)",
  },
  {
    name: "Gap",
    val: 1980 - 980,
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

const MONTHLY_UNIT_STATUS = [
  {
    name: "KCC",
    val: 90,
    target: 28020,
    achieved: 22000,
    gap: 6020,
  },
  {
    name: "MCP",
    val: 84,
    target: 39070,
    achieved: 32960,
    gap: 6110,
  },
  {
    name: "ICC",
    val: 93,
    target: 30020,
    achieved: 28000,
    gap: 2020,
  },
];

const YEARLY_UNIT_STATUS = [
  {
    name: "KCC",
    val: 46,
    target: 28020 * 12,
    achieved: 22000 * 7,
    gap: 182240,
  },
  {
    name: "MCP",
    val: 49,
    target: 39070 * 12,
    achieved: 32960 * 7,
    gap: 238120,
  },
  {
    name: "ICC",
    val: 93,
    target: 30020 * 12,
    achieved: 28000 * 7,
    gap: 164240,
  },
];

const micProductionData = [
  {
    name: "Jan",
    target: 4000,
    achieved: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    target: 3398,
    achieved: 2000,
    amt: 2210,
  },
  {
    name: "Mar",
    target: 9800,
    achieved: 2000,
    amt: 2290,
  },
  {
    name: "Apr",
    target: 3780,
    achieved: 2908,
    amt: 2000,
  },
  {
    name: "May",
    target: 4890,
    achieved: 1800,
    amt: 2181,
  },
  {
    name: "Jun",
    target: 3390,
    achieved: 2800,
    amt: 2500,
  },
  {
    name: "Jul",
    target: 3490,
    achieved: 2490,
    amt: 2100,
  },
  {
    name: "Aug",
    target: 3000,
    achieved: 1398,
    amt: 2210,
  },
  {
    name: "Sep",
    target: 9800,
    achieved: 2000,
    amt: 2290,
  },
  {
    name: "Oct",
    target: 3780,
    achieved: 2908,
    amt: 2000,
  },
  {
    name: "Nov",
    target: 9800,
    achieved: 2000,
    amt: 2290,
  },
  {
    name: "Dec",
    target: 4490,
    achieved: 3300,
    amt: 2100,
  },
];

const oreProductionData = [
  {
    name: "Jan",
    target: 2400,
    achieved: 1400,
  },
  {
    name: "Feb",
    target: 1398,
    achieved: 1200,
  },
  {
    name: "Mar",
    target: 2800,
    achieved: 1400,
    amt: 2290,
  },
  {
    name: "Apr",
    target: 2008,
    achieved: 1900,
    amt: 2000,
  },
  {
    name: "May",
    target: 2300,
    achieved: 1800,
    amt: 2181,
  },
  {
    name: "Jun",
    target: 1800,
    achieved: 100,
    amt: 2500,
  },
  {
    name: "Jul",
    target: 2300,
    achieved: 800,
    amt: 2100,
  },
  {
    name: "Aug",
    target: 2398,
    achieved: 2200,
    amt: 2210,
  },
  {
    name: "Sep",
    target: 2400,
    achieved: 2280,
    amt: 2290,
  },
  {
    name: "Oct",
    target: 2408,
    achieved: 2200,
    amt: 2000,
  },
  {
    name: "Nov",
    target: 1500,
    achieved: 1300,
    amt: 2290,
  },
  {
    name: "Dec",
    target: 2300,
    achieved: 2240,
    amt: 2100,
  },
];

const variableCostData = [
  {
    name: "Jan",
    budget: 4000,
    actual: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    budget: 3398,
    actual: 2000,
    amt: 2210,
  },
  {
    name: "Mar",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Apr",
    budget: 3780,
    actual: 2908,
    amt: 2000,
  },
  {
    name: "May",
    budget: 4890,
    actual: 1800,
    amt: 2181,
  },
  {
    name: "Jun",
    budget: 3390,
    actual: 2800,
    amt: 2500,
  },
  {
    name: "Jul",
    budget: 3490,
    actual: 2490,
    amt: 2100,
  },
  {
    name: "Aug",
    budget: 3000,
    actual: 1398,
    amt: 2210,
  },
  {
    name: "Sep",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Oct",
    budget: 3780,
    actual: 2908,
    amt: 2000,
  },
  {
    name: "Nov",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Dec",
    budget: 4490,
    actual: 3300,
    amt: 2100,
  },
];

const fixedCostData = [
  {
    name: "Jan",
    budget: 4000,
    actual: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    budget: 3398,
    actual: 2000,
    amt: 2210,
  },
  {
    name: "Mar",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Apr",
    budget: 3780,
    actual: 2908,
    amt: 2000,
  },
  {
    name: "May",
    budget: 4890,
    actual: 1800,
    amt: 2181,
  },
  {
    name: "Jun",
    budget: 3390,
    actual: 2800,
    amt: 2500,
  },
  {
    name: "Jul",
    budget: 3490,
    actual: 2490,
    amt: 2100,
  },
  {
    name: "Aug",
    budget: 3000,
    actual: 1398,
    amt: 2210,
  },
  {
    name: "Sep",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Oct",
    budget: 3780,
    actual: 2908,
    amt: 2000,
  },
  {
    name: "Nov",
    budget: 9800,
    actual: 2000,
    amt: 2290,
  },
  {
    name: "Dec",
    budget: 4490,
    actual: 3300,
    amt: 2100,
  },
];

const getRandomNumber = () => {
  return Math.round(Math.random() * 2.0 * 100) / 100;
};

const gradeRecoveryData = [
  {
    name: "Jan",
    grade: getRandomNumber(),
  },
  {
    name: "Feb",
    grade: getRandomNumber(),
  },
  {
    name: "Mar",
    grade: getRandomNumber(),
  },
  {
    name: "Apr",
    grade: getRandomNumber(),
  },
  {
    name: "May",
    grade: getRandomNumber(),
  },
  {
    name: "Jun",
    grade: getRandomNumber(),
  },
  {
    name: "Jul",
    grade: getRandomNumber(),
  },
  {
    name: "Aug",
    grade: getRandomNumber(),
  },
  {
    name: "Sep",
    grade: getRandomNumber(),
  },
  {
    name: "Oct",
    grade: getRandomNumber(),
  },
  {
    name: "Nov",
    grade: getRandomNumber(),
  },
  {
    name: "Dec",
    grade: getRandomNumber(),
  },
];

const financeBillingData = [
  {
    name: "Number of Contracts",
    val: "06",
  },
  {
    name: "Ongoing Contracts",
    val: "04",
  },
  {
    name: "",
    val: "",
  },
  {
    name: "",
    val: "",
  },
  {
    name: "",
    val: "",
  },
  {
    name: "",
    val: "",
  },
];

const contractBillingData = [
  {
    name: "Invoice Raised",
    val: "05",
  },
  {
    name: "Payment Cleared",
    val: "04",
  },
  {
    name: "Delay Activities",
    val: "03",
  },
  {
    name: "Client Issues",
    val: "02",
  },
  {
    name: "Excess Over BOQ Quantities",
    val: "05",
  },
  {
    name: "Progress Hinderence",
    val: "03",
  },
];

const budgetApi = "http://localhost:5000/get_budget";
const actualApi = "http://localhost:5000/get_actual";
const remainingApi = "http://localhost:5000/get_remaining";
const inProgressApi = "http://localhost:5000/get_in_progress";
const progressApi = "http://localhost:5000/get_progress";
const daysCompletedApi = "http://localhost:5000/get_days_completed";
const durationApi = "http://localhost:5000/get_duration";
const allDataApi = "http://localhost:5000/get_all_data";
const performanceApi = "http://localhost:5000/get_performance_data";
const yearsApi = "http://localhost:5000/get_years";
const taskFrequencyApi = "http://localhost:5000/get_task_frequency";
// const contractApi = "http://localhost:5000/get_contractor";
const unitMineContractorApi = "http://localhost:5000/get_unit_mine_contractor";
const mineDataApi = "http://localhost:5000/get_mine_data";

const fetch_unit_mine_contractor_data = async () => {
  try {
    const response = await axios.get(unitMineContractorApi);
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.error('Error fetching data:', error);
    return null; // or throw error if you want to propagate it
  }
};

const UNIT_MINE_CONTRACTOR = await fetch_unit_mine_contractor_data();

const SHIFTS = ["8am - 4pm", "12am - 8pm", "8pm - 4am"];

const ChartDataProvider = ({ children }) => {

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  // dashboard----
  const [performanceData_Ore, setPerformanceData_Ore] = useState({});
  // ----dashboard

  // progress----

  const [allData, setAllData] = useState([{}]);

  const [department, setDepartment] = useState("Mining");

  const [currMines, setCurrMines] = useState(MINES);
  // const [currContract, setCurrContract] = useState(CONTRACTS);

  const [unit, setUnit] = useState(UNITS[0]);
  const [mine, setMine] = useState(UNITS_MINES[unit][0]);
  const [contract, setContract] = useState("");

  const [budget, setBudget] = useState(0);
  const [actual, setActual] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [notStarted, setNotStarted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  const [daysCompleted, setDaysCompleted] = useState(0);

  const [duration, setDuration] = useState(0);

  const [years, setYears] = useState([]);

  const [mineData, setMineData] = useState([]);
  // ----progress

  // dashboard----
  const fetchPerformanceData = async (department, setter) => {
    let endpoint = `${performanceApi}?department=${department}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0];
        setter({
          Cumulative_progress: (data["Cumulative_progress"]),
          Daily_progress: (data["Daily_progress"]),
          Daily_target: (data["Daily_target"]),
          Monthly_progress: (data["Monthly_progress"]),
          Monthly_target: (data["Monthly_target"]),
          Unit: data["Unit"],
        });
      }
    });
  };
  // ----dashboard

  // progress----
  const fetchAllData = async () => {
    let endpoint = `${allDataApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data.map((obj) => ({
          id: uuidv4(),
          Units: obj.Units,
          Mines: obj.Mines,
          Task: obj.Task,
          Contractors: obj.Contractors,
          StartDate: obj["StartDate"],
          Duration: obj.Duration,
          EndDate: obj["EndDate"],
          DaysCompleted: obj["DaysCompleted"],
          Progress: obj.Progress,
          Budget: obj.Budget,
          Actual: obj.Actual,
          Remaining: obj.Remaining,
        }));

        setAllData(data);
      }
    });
  };

  const fetchMineData = async () => {
    let endpoint = `${mineDataApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        setMineData(response.data);
      }
    });
  }

  const fetchBudget = async () => {
    let endpoint = `${budgetApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = (response.data && response.data[0] && response.data[0].Budget) ? response.data[0].Budget : 0;
        setBudget(data);
      }
    });
  };

  const fetchActual = async () => {
    let endpoint = `${actualApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = (response.data && response.data[0] && response.data[0].Actual) ? response.data[0].Actual : 0;
        setActual(data);
      }
    });
  };

  const fetchRemaining = async () => {
    let endpoint = `${remainingApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = (response.data && response.data[0] && response.data[0].Remaining)
          ? response.data[0].Remaining
          : 0;
        setRemaining(data);
      }
    });
  };

  const fetchInProgress = async () => {
    let endpoint = `${inProgressApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0].Progress ? response.data[0].Progress : 0;
        setInProgress(data);
      }
    });
  };

  const fetchProgress = async (val) => {
    let endpoint = `${progressApi}?percent=${val}&&mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0].Progress ? response.data[0].Progress : 0;
        if (val === 0) setNotStarted(data);
        else setCompleted(data);
      }
    });
  };

  const fetchDaysCompleted = async () => {
    let endpoint = `${daysCompletedApi}?mine=${mine}&&unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data && response.data[0] && response.data[0].val ? response.data[0].val : 0;
        setDaysCompleted(data);
      }
    });
  };

  const fetchDuration = async (val) => {
    let endpoint = `${durationApi}?mine=${mine}&&unit=${unit}&&contract=${contract}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data[0].val ? response.data[0].val : 0;
        setDuration(data);
      }
    });
  };

  const fetchYears = async () => {
    await axios.get(yearsApi).then((response) => {
      if (response) {
        setYears(response.data.years);
      }
    });
  };

  const fetchTaskFrequency = async (year) => {
    let endpoint = `${taskFrequencyApi}?year=${year}`;
    const response = await axios.get(endpoint);
    if (response) {
      return response.data;
    }
  };

  const fetchContractor = async (year) => {
    // let endpoint = `${contractApi}?unit=${unit}&mine=${mine}`;
    // const response = await axios.get(endpoint);
    // if (response) {
    //   setContract(response.data.contractor);
    // }
  };

  useEffect(() => {
    fetchPerformanceData("Ore Grade (%Cu)", setPerformanceData_Ore);
    fetchYears();
    // updatedMiningBillData.forEach(item =>
    //   item.gap(item.actual, item.target).toFixed(0)
    // )
  }, []);

  useEffect(() => {
    if (unit !== "UNITS" && unit !== "") {
      const mines = [...UNITS_MINES[unit]];
      setCurrMines(mines);
      setMine(mines[0]);
    }
  }, [unit]);

  useEffect(() => {
    // if (unit !== "UNITS" && unit !== "" && mine !== "MINES" && mine !== "") {
    //   fetchContractor();
    // }
    const obj = UNIT_MINE_CONTRACTOR.find(el => el.Unit === unit && el.Mine === mine);
    setContract(obj.Contractor);
  }, [mine]);

  useEffect(() => {
    fetchAllData();
    fetchBudget();
    fetchActual();
    fetchRemaining();
    fetchInProgress();
    fetchProgress(0);
    fetchProgress(1);
    fetchDaysCompleted();
    fetchDuration();
    fetchMineData();
  }, [mine, unit, contract]);

  const [billingData, setBillingData] = useState([]);

  return (
    <ChartDataContext.Provider
      value={{
        department,
        setDepartment,
        MINES,
        UNITS,
        DEPARTMENTS,
        DRILLING_TYPES,
        CONTRACTS,
        oreBadgeData,
        micBadgeData,
        MONTHLY_UNIT_STATUS,
        YEARLY_UNIT_STATUS,
        oreProductionData,
        micProductionData,
        variableCostData,
        fixedCostData,
        gradeRecoveryData,
        billingData,
        // miningBillingData,
        financeBillingData,
        contractBillingData,

        mine,
        setMine,
        unit,
        setUnit,
        contract,
        setContract,

        budget,
        actual,
        remaining,

        notStarted,
        inProgress,
        completed,

        daysCompleted,

        duration,

        allData,

        performanceData_Ore,

        years,

        FINANCIAL_YEARS,

        MONTHS,

        fetchTaskFrequency,

        UNITS_MINES,

        currMines,

        mineData,

        userName, setUserName,

        userId, setUserId,

        ADMIN,

        setYearsFromNum,

        SHIFTS,

        HR_POSITIONS
      }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};

export default ChartDataProvider;
