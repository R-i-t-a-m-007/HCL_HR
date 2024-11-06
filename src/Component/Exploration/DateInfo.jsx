import React from "react";
import { useExplorationData } from "../../context/ExplorationDataProvider";

export const DateInfo = () => {
  const { loiDate, mobPeriod, startDate, endDate } = useExplorationData();

  const data = [
    {
      label: "LOI Date",
      val: loiDate.loi_date,
    },
    {
      label: "Mobilisation Period",
      val: `${mobPeriod.mobilisation_period}`,
    },
    {
      label: "Start Date",
      val: startDate.start_date,
    },
    {
      label: "End Date",
      val: endDate.end_date,
    },
  ];

  return (
    <div id="dateInfo" className="font-semibold">
      {data.map((info) => (
        <div key={info.label}>
          <span className="inline-block min-w-[132px] text-black">
            {" "}
            {info.label}:
          </span>{" "}
          {info.val}
        </div>
      ))}
    </div>
  );
};
