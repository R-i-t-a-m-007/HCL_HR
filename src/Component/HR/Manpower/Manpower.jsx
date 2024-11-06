import React from "react";
import Workers from "./Workers";
import Card from "@mui/material/Card";
import { useHRData } from "../../../context/HRDataProvider";

const Manpower = () => {
  const { empManpower } = useHRData();

  const chartData = [
    {
      label: "Executive Employees",
      Male: empManpower.Male_Executive,
      Female: empManpower.Female_Executive,
      Total: empManpower.Male_Executive + empManpower.Female_Executive,
    },
    {
      label: "Non-Executive Employees",
      Male: empManpower.Male_NonExecutive,
      Female: empManpower.Female_NonExecutive,
      Total: empManpower.Male_NonExecutive + empManpower.Female_NonExecutive,
    },
  ];
  return (
    <Card className="shadow-custom-shadow h-[95.6%] rounded-xl mt-3">
      <h6 className="text-deepblue font-semibold ml-2 mt-2">Total Manpower</h6>
      {chartData.map((data) => (
        <Workers data={data} key={data.label} />
      ))}
    </Card>
  );
};

export default Manpower;
