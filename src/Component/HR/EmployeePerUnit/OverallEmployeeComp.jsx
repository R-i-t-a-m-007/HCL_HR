import React from "react";
import Card from "@mui/material/Card";
import DoughnutChart from "../../Charts/DoughnutChart";
import { Label } from "../../Label";
import { useHRData } from "../../../context/HRDataProvider";
const donutChartColors = [
  "#64A33F",
  "#9EAAC3",
  "#E7DFCC",
  "#ADC8FF",
  "#FEDD82",
  "#B2E187",
  "#002060",
  "#FFA800",
];
const OverallEmployeeComp = ({ unit }) => {

  const { bloodGroupCount } = useHRData();
  const total = Object.values(bloodGroupCount[unit]).reduce((acc, curr) => acc + curr, 0);
  const percentages = Object.values(bloodGroupCount[unit]).map(val => parseInt(val/total*100));

  const doughnutChartData = {
    series: percentages,
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: '55%'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: donutChartColors,
      },
      legend: {
        position: "right",
        fontSize: "14px",
        fontWeight: 500,
      },
      labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      colors:donutChartColors
    },
  };
  return (
    <Card className="w-[25rem] h-[16.5rem] rounded-xl py-2 space-y-4 relative shadow-custom-shadow">
      <Label>Overall Employee Composition</Label>
      <DoughnutChart className="mt-5" doughnutChartData={doughnutChartData} />
    </Card>
  );
};

export default OverallEmployeeComp;
