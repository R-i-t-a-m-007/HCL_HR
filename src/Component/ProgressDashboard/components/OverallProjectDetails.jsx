import React from "react";
import { useChartData } from "../../../context/ChartDataProvider";
import { TaskFrequencyChart } from "./TaskFrequencyChart";

export const OverallProjectDetails = () => {
  const { MINES, UNITS } = useChartData();

  const dataItems = [
    {
      name: "Units",
      data: UNITS,
    },
    {
      name: "Mines",
      data: MINES,
    },
    // {
    //   name: "Contractors",
    //   data: CONTRACTS,
    // },
  ];

  return (
    <div className="detailsContainer pt-2">
      {dataItems.map((item) => (
        <div key={item.name} className="detail pb-2">
          <div className="label pb-1">
            <span className="numberBadge">{item.data.length}</span>
            <span>{item.name}: </span>
          </div>
          <ul className="list flex gap-x-3 flex-wrap">
            {item.data.map((subItem, idx) => (
              <li key={idx}>
                {subItem}
                {idx < item.data.length - 1 && ","}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <TaskFrequencyChart />
    </div>
  );
};
