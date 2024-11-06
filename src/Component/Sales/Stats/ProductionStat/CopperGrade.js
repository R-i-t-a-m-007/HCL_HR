import { Card, Typography, Button } from "@mui/material";
import React from "react";
import LineChartDemo2 from "../../../Charts/LineChartDemo2";
const lineChartData = [
  {
    name: "April",
    "Last Month": 4000,
    "This Month": 2400,
    "Next Month": 2400,
    amt: 2400,
  },
  {
    name: "May",
    "Last Month": 3000,
    "This Month": 1398,
    "Next Month": 2400,
    amt: 2210,
  },
  {
    name: "June",
    "Last Month": 2000,
    "This Month": 9800,
    "Next Month": 2800,
    amt: 2290,
  },
  {
    name: "July",
    "Last Month": 2780,
    "This Month": 3908,
    "Next Month": 2400,
    amt: 2000,
  },
  {
    name: "Aug",
    "Last Month": 1890,
    "This Month": 4800,
    "Next Month": 4400,
    amt: 2181,
  },
  {
    name: "Sep",
    "Last Month": 2390,
    "This Month": 3800,
    "Next Month": 2400,
    amt: 2500,
  },
  {
    name: "Oct",
    "Last Month": 3490,
    "This Month": 4300,
    "Next Month": 2400,
     "Next Month": 7000,
    amt: 2100,
  },
  {
    name: "Nov",
    "Last Month": 5500,
    "This Month": 6300,
    "Next Month": 5000,
    amt: 2100,
  },
  {
    name: "Dec",
    "Last Month": 3490,
    "This Month": 4300,
    "Next Month": 8000,
    amt: 2100,
  },
  {
    name: "Jan",
    "Last Month": 2490,
    "This Month": 4900,
    "Next Month": 1400,
    amt: 2100,
  },
  {
    name: "Feb",
    "Last Month": 3490,
    "This Month": 4300,
    "Next Month": 9400,
    amt: 2100,
  },
  {
    name: "Mar",
    "Last Month": 6500,
    "This Month": 7500,
    "Next Month": 6000,
    amt: 2100,
  },
];

const CopperGrade = ({ unit }) => {
  return (
    <div>
      <Card className="w-[40rem] h-[17.5rem]">
        <div className="flex flex-col items-center mt-2">
          <Button className="bg-[#002060] h-6 text-white text-sm font-bold capitalize">
            Production
          </Button>
          <Typography className="font-semibold" variant="lead">
            Copper Grade per Month
          </Typography>
        </div>

        <LineChartDemo2 lineChartData={lineChartData} />
      </Card>
    </div>
  );
};

export default CopperGrade;
