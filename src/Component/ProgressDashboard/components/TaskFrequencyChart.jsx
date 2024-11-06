import React, { useEffect, useState } from "react";
import { useChartData } from "../../../context/ChartDataProvider";
import { SimpleLineChart } from "../../SimpleLineChart";
import { CustomDropdown } from "../../CustomDropdown";

export const TaskFrequencyChart = () => {
  const { years, fetchTaskFrequency } = useChartData();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [taskFrequencyData, setTaskFrequencyData] = useState([{}]);
  const transformData = (data) => {
    let i=1, j=0;
    let transformedData = [];
    while(i < 13) {
      const item = data[j];
      if( item && (parseInt(item.month) === i)) {
        transformedData.push({...item});
        j++;
      } else {
        transformedData.push({
          month: i,
          tasks: 0
        })
      }
      i++;
    }
    setTaskFrequencyData(transformedData);
  }

  useEffect(() => {
    fetchTaskFrequency(selectedYear)
      .then((data) => {
        transformData(data);
      })
      .catch((error) => {
        console.error("Error fetching task frequency data:", error);
      });
  }, [selectedYear]);
  return (
    <div className="taskFrequencyChart" style={{width: "100%"}}>
      <CustomDropdown
        name="yearsDropdown"
        className="minesDropdown"
        containerStyle={{ display: "flex", justifyContent: "end" }}
        value={selectedYear}
        setter={setSelectedYear}
        options={years}
      />
      <SimpleLineChart chartData={taskFrequencyData} xDataKey="month" lineDataKey="tasks" height={230} />
    </div>
  );
};
