import React from "react";

import Card from "@mui/material/Card";
import LineChartDemo from "../../Charts/LineChartDemo";
import { Label } from "../../Label";
const lineChartData = {
  ICC: [
    {
      name: "April",
      "Last Month": 4000,
      "This Month": 2400,
      amt: 2400,
    },
    {
      name: "May",
      "Last Month": 3000,
      "This Month": 1398,
      amt: 2210,
    },
    {
      name: "June",
      "Last Month": 2000,
      "This Month": 9800,
      amt: 2290,
    },
    {
      name: "July",
      "Last Month": 2780,
      "This Month": 3908,
      amt: 2000,
    },
    {
      name: "Aug",
      "Last Month": 1890,
      "This Month": 4800,
      amt: 2181,
    },
    {
      name: "Sep",
      "Last Month": 2390,
      "This Month": 3800,
      amt: 2500,
    },
    {
      name: "Oct",
      "Last Month": 3490,
      "This Month": 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      "Last Month": 5500,
      "This Month": 6300,
      amt: 2100,
    },
    {
      name: "Dec",
      "Last Month": 3490,
      "This Month": 4300,
      amt: 2100,
    },
    {
      name: "Jan",
      "Last Month": 2490,
      "This Month": 4900,
      amt: 2100,
    },
    {
      name: "Feb",
      "Last Month": 3490,
      "This Month": 4300,
      amt: 2100,
    },
    {
      name: "Mar",
      "Last Month": 6500,
      "This Month": 7500,
      amt: 2100,
    },
  ],
  MCP: [
    {
      name: "April",
      "Last Month": 3400,
      "This Month": 2900,
      amt: 2400,
    },
    {
      name: "May",
      "Last Month": 2090,
      "This Month": 1498,
      amt: 2210,
    },
    {
      name: "June",
      "Last Month": 2550,
      "This Month": 7800,
      amt: 2290,
    },
    {
      name: "July",
      "Last Month": 3280,
      "This Month": 4108,
      amt: 2000,
    },
    {
      name: "Aug",
      "Last Month": 2890,
      "This Month": 3400,
      amt: 2181,
    },
    {
      name: "Sep",
      "Last Month": 2990,
      "This Month": 2800,
      amt: 2500,
    },
    {
      name: "Oct",
      "Last Month": 3690,
      "This Month": 3900,
      amt: 2100,
    },
    {
      name: "Nov",
      "Last Month": 5500,
      "This Month": 2300,
      amt: 2100,
    },
    {
      name: "Dec",
      "Last Month": 5490,
      "This Month": 5800,
      amt: 2100,
    },
    {
      name: "Jan",
      "Last Month": 3490,
      "This Month": 4400,
      amt: 2100,
    },
    {
      name: "Feb",
      "Last Month": 4490,
      "This Month": 4600,
      amt: 2100,
    },
    {
      name: "Mar",
      "Last Month": 7500,
      "This Month": 6500,
      amt: 2100,
    },
  ],
  KCC: [
    {
      name: "April",
      "Last Month": 3000,
      "This Month": 4000,
      amt: 2400,
    },
    {
      name: "May",
      "Last Month": 2800,
      "This Month": 3498,
      amt: 2210,
    },
    {
      name: "June",
      "Last Month": 3400,
      "This Month": 8900,
      amt: 2290,
    },
    {
      name: "July",
      "Last Month": 4580,
      "This Month": 3208,
      amt: 2000,
    },
    {
      name: "Aug",
      "Last Month": 2890,
      "This Month": 5000,
      amt: 2181,
    },
    {
      name: "Sep",
      "Last Month": 3390,
      "This Month": 3900,
      amt: 2500,
    },
    {
      name: "Oct",
      "Last Month": 4490,
      "This Month": 4900,
      amt: 2100,
    },
    {
      name: "Nov",
      "Last Month": 5700,
      "This Month": 3500,
      amt: 2100,
    },
    {
      name: "Dec",
      "Last Month": 4590,
      "This Month": 3400,
      amt: 2100,
    },
    {
      name: "Jan",
      "Last Month": 3790,
      "This Month": 5500,
      amt: 2100,
    },
    {
      name: "Feb",
      "Last Month": 4490,
      "This Month": 5300,
      amt: 2100,
    },
    {
      name: "Mar",
      "Last Month": 4500,
      "This Month": 6500,
      amt: 2100,
    },
  ]
}

const OverallMonth = ({ unit }) => {
  return (
    <Card className="w-[42rem] h-[16.5rem] relative py-2 rounded-xl shadow-custom-shadow">
      <Label>Overall employees strength compared to month</Label>
      <LineChartDemo className="mt-5" lineChartData={lineChartData[unit]} />
    </Card>
  );
};

export default OverallMonth;
