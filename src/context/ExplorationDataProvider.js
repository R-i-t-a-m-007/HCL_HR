import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useChartData } from "./ChartDataProvider";

const ExplorationDataContext = createContext();
export const useExplorationData = () => useContext(ExplorationDataContext);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FINANCIAL_YEAR_LIST = ["2022-23", "2023-24", "2024-25"];

const defaultBillStatus = {
  billRaised: 0,
  paymentMade: 0,
};

const defaultProgressStatus = {
  target: 0,
  achieved: 0,
};

const defaultProgressFY = {
  April: defaultProgressStatus,
  May: defaultProgressStatus,
  June: defaultProgressStatus,
  July: defaultProgressStatus,
  August: defaultProgressStatus,
  September: defaultProgressStatus,
  October: defaultProgressStatus,
  November: defaultProgressStatus,
  December: defaultProgressStatus,
  January: defaultProgressStatus,
  February: defaultProgressStatus,
  March: defaultProgressStatus,
};

const billPerMonthApi = "http://localhost:5000/bill_month";
const billPerFYApi = "http://localhost:5000/bill_fy";
const billFromInceptionApi = "http://localhost:5000/bill_inception";
const capexPerFYApi = "http://localhost:5000/capex_fy";

const loi_date = "http://localhost:5000/loi_date";
const mobilisation_period = "http://localhost:5000/mobilisation_period";
const start_date = "http://localhost:5000/start_date";
const end_date = "http://localhost:5000/end_date";

const physicalWorkPerMonthApi =
  "http://localhost:5000/physical_work_done_month";
const physicalWorkPerFYApi = "http://localhost:5000/physical_work_done_fy";
const physicalWorkFromInceptionApi =
  "http://localhost:5000/physical_work_done_inception";
const drillingStatusPerMonthApi = "http://localhost:5000/drilling_status_month";
const drillingStatusPerFYApi = "http://localhost:5000/drilling_status_fy";
const drillingStatusFromInceptionApi =
  "http://localhost:5000/drilling_status_inception";
const dbCheckerApi = "http://localhost:5000/check_exploration_db";
const archivalApi = "http://localhost:5000/archive";
const latest_etl_date_api =
  "http://localhost:5000/get_exploration_latest_etl_date";
const filterDataApi = "http://localhost:5000/get_exploration_filter_data";
const UNITS_MINES = {
  ICC: ["Sudra", "Kendadih"],
  MCP: ["Mines O/C", "Mines U/C"],
  KCC: ["Khetri", "Banwas", "Kolihan"],
};

export const ExplorationDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { UNITS, MINES, DRILLING_TYPES, CONTRACTS } =
    useChartData();

  const getMines = (unitName) => {
    // let mines = new Set();
    // filterData &&
    //   filterData.forEach((data) => {
    //     if (data.unit === unitName) {
    //       mines.add(data.mine);
    //     }
    //   });
    // return Array.from(mines);
    const mines = UNITS_MINES[unitName] || [];
    return mines;
  };

  const getDrillingTypes = (unitName, mineName) => {
    let drillingTypes = new Set();
    filterData &&
      filterData.forEach((data) => {
        if (data.unit === unitName && data.mine === mineName) {
          drillingTypes.add(data.drillingType);
        }
      });
    return Array.from(drillingTypes);
  };

  const getContractors = (unitName, mineName, drillingType) => {
    let contractors = new Set();
    filterData &&
      filterData.forEach((data) => {
        if (
          data.unit === unitName &&
          data.mine === mineName &&
          data.drillingType === drillingType
        ) {
          contractors.add(data.contractor);
        }
      });
    return Array.from(contractors);
  };

  const [options, setOptions] = useState({
    units: UNITS,
    mines: [],
    drillingTypes: [],
    contractors: [],
  });

  const [latestEtlDate, setLatestEtlDate] = useState("");

  const [filterData, setFilterData] = useState(null);

  const fetchFilterData = async () => {
    await axios.get(filterDataApi).then((response) => {
      if (response) {
        const data = response.data;
        setFilterData(data);
      }
    });
  };

  const fetchLatestEtlDate = async () => {
    await axios.get(latest_etl_date_api).then((response) => {
      if (response) {
        const data = response.data;
        setLatestEtlDate(data[0].date);
      }
    });
  };
  const [yearsFromInception, setYearsFromInception] = useState([]);

  const [filters, setFilters] = useState({
    unit: UNITS[0],
    // mine: MINES[0],
    // drillingType: DRILLING_TYPES[0],
    // contractor: CONTRACTS[0],
    mine: "",
    drillingType: "",
    contractor: "",
  });

  const [billPerMonth, setBillPerMonth] = useState(defaultBillStatus);
  const [billPerFY, setBillPerFY] = useState(defaultBillStatus);
  const [billFromInception, setBillFromInception] = useState(defaultBillStatus);
  const [capexPerFY, setCapexPerFY] = useState(defaultProgressStatus);
  const [billPerMonthSelected, setBillPerMonthSelected] = useState(MONTHS[0]);
  const [billPerFYSelected, setBillPerFYSelected] = useState(
    FINANCIAL_YEAR_LIST[0]
  );
  const [capexPerFYSelected, setCapexPerFYSelected] = useState(
    FINANCIAL_YEAR_LIST[0]
  );
  const [loiDate, setLoiDate] = useState(0);
  const [mobPeriod, setMobPeriod] = useState(0);
  const [startDate, setStartDate] = useState({ start_date: "No data" });
  const [endDate, setEndDate] = useState({ end_date: "No data" });

  const [
    formattedPhysicalInceptionChartData,
    setFormattedPhysicalInceptionChartData,
  ] = useState([]);
  const [
    formattedDrillingInceptionChartData,
    setFormattedDrillingInceptionChartData,
  ] = useState([]);

  // const [dbExists, setDbExists] = useState(false);

  // Charts ---
  const [physicalWorkSelectedMonth, setPhysicalWorkSelectedMonth] = useState(
    MONTHS[0]
  );
  const [physicalWorkPerMonth, setPhysicalWorkPerMonth] = useState(
    defaultProgressStatus
  );

  const [physicalWorkSelectedFY, setPhysicalWorkSelectedFY] = useState(
    FINANCIAL_YEAR_LIST[0]
  );
  const [physicalWorkPerFY, setPhysicalWorkPerFY] = useState(
    defaultProgressStatus
  );

  const [physicalWorkFromInception, setPhysicalWorkFromInception] =
    useState(defaultProgressFY);

  const [drillingStatusSelectedMonth, setDrillingStatusSelectedMonth] =
    useState(MONTHS[0]);
  const [drillingStatusPerMonth, setDrillingStatusPerMonth] = useState(
    defaultProgressStatus
  );

  const [drillingStatusSelectedFY, setDrillingStatusSelectedFY] = useState(
    FINANCIAL_YEAR_LIST[0]
  );
  const [drillingStatusPerFY, setDrillingStatusPerFY] = useState(
    defaultProgressStatus
  );
  const [drillingStatusFromInception, setDrillingStatusFromInception] =
    useState(defaultProgressFY);

  const handleArchival = async () => {
    await axios.get(archivalApi).then((response) => {
      if (response && response.data) {
        // setDbExists(response.data.exists);
        // console.log(response.data.exists)
      }
    });
  };

  const getModifiedMineName = (mine) => {
    let m = mine.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    return m.split(" ")[0];
  };

  let MINE = filters.mine && getModifiedMineName(filters.mine);

  const fetchBillPerMonth = async () => {
    let endpoint = `${billPerMonthApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&month=${billPerMonthSelected}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setBillPerMonth(response.data);
      }
    });
  };

  const fetchBillPerFY = async () => {
    let endpoint = `${billPerFYApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&financial_year=${billPerFYSelected}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setBillPerFY(response.data);
      }
    });
  };
  const fetchBillFromInception = async () => {
    let endpoint = `${billFromInceptionApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setBillFromInception(response.data);
      }
    });
  };
  const fetchCapexPerFY = async () => {
    let endpoint = `${capexPerFYApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&financial_year=${capexPerFYSelected}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setCapexPerFY(response.data);
      }
    });
  };
  const fetchLoiDate = async () => {
    let endpoint = `${loi_date}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setLoiDate(response.data);
      }
    });
  };
  const fetchMobPeriod = async () => {
    let endpoint = `${mobilisation_period}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setMobPeriod(response.data);
      }
    });
  };
  const fetchStartDate = async () => {
    // let endpoint = `${start_date}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}`;
    // await axios.get(endpoint).then((response) => {
    //   if (response && response.data) {
    //     setStartDate(response.data);
    //     return response.data.start_date;
    //   }
    // });
    let endpoint = `${start_date}?unit=${filters.unit}&mine=${MINE}&drillingType=${filters.drillingType}&contractor=${filters.contractor}`;
    try {
      const response = await axios.get(endpoint);
      if (response && response.data && response.data.start_date) {
        // Check if start_date exists in response.data
        setStartDate(response.data);
        return response.data.start_date;
      } else {
        console.log("No start date found in response:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching start date:", error);
      return null;
    }
  };
  const fetchEndDate = async () => {
    let endpoint = `${end_date}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}`;
    try {
      const response = await axios.get(endpoint);
      if (response && response.data && response.data.end_date) {
        setEndDate(response.data);
        return response.data.end_date;
      } else {
        console.log("No end date found in response:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching end date:", error);
      return null;
    }
  };

  const fetchPhysicalWorkPerMonth = async () => {
    let endpoint = `${physicalWorkPerMonthApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&month=${physicalWorkSelectedMonth}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setPhysicalWorkPerMonth(response.data);
      }
    });
  };

  const fetchPhysicalWorkPerFY = async () => {
    let endpoint = `${physicalWorkPerFYApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&financial_year=${physicalWorkSelectedFY}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setPhysicalWorkPerFY(response.data);
      }
    });
  };

  const fetchPhysicalWorkFromInception = async (start, end) => {
    if (!(start === "No data" || end === "No data")) {
      start = start.split(".").reverse().join("-");
      end = end.split(".").reverse().join("-");
    }

    let endpoint = `${physicalWorkFromInceptionApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&startDate=${start}&&endDate=${end}`;
    try {
      const response = await axios.get(endpoint);
      if (response && response.data) {
        setPhysicalWorkFromInception(response.data);
        return response.data;
      } else {
        console.log(
          "No PhysicalWorkFromInception data found in response:",
          response.data
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchDrillingStatusPerMonth = async () => {
    let endpoint = `${drillingStatusPerMonthApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&month=${drillingStatusSelectedMonth}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setDrillingStatusPerMonth(response.data);
      }
    });
  };

  const fetchDrillingStatusPerFY = async () => {
    let endpoint = `${drillingStatusPerFYApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&financial_year=${drillingStatusSelectedFY}`;
    await axios.get(endpoint).then((response) => {
      if (response && response.data) {
        setDrillingStatusPerFY(response.data);
      }
    });
  };

  const fetchDrillingStatusFromInception = async (start, end) => {
    if (!(start === "No data" || end === "No data")) {
      start = start.split(".").reverse().join("-");
      end = end.split(".").reverse().join("-");
    }

    let endpoint = `${drillingStatusFromInceptionApi}?unit=${filters.unit}&&mine=${MINE}&&drillingType=${filters.drillingType}&&contractor=${filters.contractor}&&startDate=${start}&&endDate=${end}`;

    try {
      const response = await axios.get(endpoint);
      if (response && response.data) {
        setDrillingStatusFromInception(response.data);
        return response.data;
      } else {
        console.log(
          "No DrillingStatusFromInception data found in response:",
          response.data
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const getFormattedInceptionChartData = (dataFromInception, years) => {
    let k = 0;
    let data = years
      ? years.map((year) => {
          const status = dataFromInception[k];
          if (!status || status.year !== year) {
            return {
              name: year,
              Target: 0,
              Achieved: 0,
            };
          }
          k++;
          return {
            name: status.year,
            Target: status.target,
            Achieved: status.achieved,
          };
        })
      : [];
    return data;
  };

  const getYearsFromInception = (start, end) => {
    // let start = startDate.start_date;
    // let end = endDate.end_date;

    if (!(start === "No data" || end === "No data")) {
      var startYear = parseInt(start.split(".")[2]);
      var endYear = parseInt(end.split(".")[2]);

      var years = [];
      for (var year = startYear; year <= endYear; year++) {
        years.push(year.toString());
      }

      setYearsFromInception(years);
      return years;
    }
  };

  const getFormattedAmount = (amount) => {
    if (!amount) return 0
    var x=amount.toString();
    var afterPoint = '';
    if(x.indexOf('.') > 0)
       afterPoint = x.substring(x.indexOf('.'),x.length);
    x = Math.floor(x);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
  }

  // useEffect(() => {
  //   fetchFilterData();
  //   fetchLatestEtlDate();
  // }, []);

  // useEffect(() => {
  //   fetchBillPerMonth();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, billPerMonthSelected]);

  // useEffect(() => {
  //   fetchBillPerFY();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, billPerFYSelected]);

  // useEffect(() => {
  //   fetchPhysicalWorkPerMonth();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, physicalWorkSelectedMonth]);

  // useEffect(() => {
  //   fetchPhysicalWorkPerFY();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, physicalWorkSelectedFY]);

  // useEffect(() => {
  //   fetchDrillingStatusPerMonth();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, drillingStatusSelectedMonth]);

  // useEffect(() => {
  //   fetchDrillingStatusPerFY();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, drillingStatusSelectedFY]);

  // useEffect(() => {
  //   let mines = getMines(filters["unit"]);
  //   if (!filters.mine) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       mine: mines[0],
  //     }));
  //   }
  //   setOptions(prev => ({
  //     ...prev,
  //     mines
  //   }))
  // }, [filterData, filters.unit])

  // useEffect(() => {
  //   let drillingTypes = getDrillingTypes(filters["unit"], filters["mine"]);
  //   if (!filters.drillingType) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       drillingType: drillingTypes[0],
  //     }));
  //   }
  //   setOptions(prev => ({
  //     ...prev,
  //     drillingTypes
  //   }))
  // }, [filters.mine])

  // useEffect(() => {
  //   let contractors = getContractors(
  //     filters["unit"],
  //     filters["mine"],
  //     filters["drillingType"]
  //   );
  //   if (!filters.contractor) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       contractor: contractors[0],
  //     }));
  //   }
  //   setOptions(prev => ({
  //     ...prev,
  //     contractors
  //   }))
  // }, [filters.drillingType])

  // useEffect(() => {
  //   // if(!dbExists) return;
  //   fetchBillFromInception();
  //   fetchLoiDate();
  //   fetchMobPeriod();

  //   const fetchData = async () => {
  //     try {
  //       const [start, end] = await Promise.all([
  //         fetchStartDate(),
  //         fetchEndDate(),
  //       ]);
  //       const years = getYearsFromInception(start, end);

  //       const physical = await fetchPhysicalWorkFromInception(start, end);
        
  //       const formattedPhysicalData = getFormattedInceptionChartData(
  //         physical,
  //         years
  //       );
  //       setFormattedPhysicalInceptionChartData(formattedPhysicalData);

  //       const drilling = await fetchDrillingStatusFromInception(start, end);
  //       const formattedDrillingData = getFormattedInceptionChartData(
  //         drilling,
  //         years
  //       );
  //       setFormattedDrillingInceptionChartData(formattedDrillingData);
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false)
  //     }
  //   };
  //   fetchData();
  // }, [filters.contractor, filters.mine, filters.drillingType, filters.unit]);

  // useEffect(() => {
  //   fetchCapexPerFY();
  // }, [filters.unit, filters.mine, filters.contractor, filters.drillingType, capexPerFYSelected]);

  return (
    <ExplorationDataContext.Provider
      value={{
        // dbExists,
        filters,
        setFilters,
        billPerMonth,
        billPerFY,
        billFromInception,
        capexPerFY,
        loiDate,
        mobPeriod,
        startDate,
        endDate,
        physicalWorkSelectedMonth,
        setPhysicalWorkSelectedMonth,
        MONTHS,
        physicalWorkPerMonth,
        physicalWorkSelectedFY,
        setPhysicalWorkSelectedFY,
        physicalWorkPerFY,
        physicalWorkFromInception,
        drillingStatusSelectedMonth,
        setDrillingStatusSelectedMonth,
        drillingStatusPerMonth,
        drillingStatusSelectedFY,
        setDrillingStatusSelectedFY,
        drillingStatusPerFY,
        drillingStatusFromInception,
        billPerMonthSelected,
        setBillPerMonthSelected,
        billPerFYSelected,
        setBillPerFYSelected,
        capexPerFYSelected,
        setCapexPerFYSelected,
        FINANCIAL_YEAR_LIST,
        yearsFromInception,
        formattedPhysicalInceptionChartData,
        formattedDrillingInceptionChartData,
        latestEtlDate,
        filterData,
        options,
        getFormattedAmount,
        loading
      }}
    >
      {children}
    </ExplorationDataContext.Provider>
  );
};
