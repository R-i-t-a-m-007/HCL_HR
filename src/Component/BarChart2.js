import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan",
    M_W_B: 2400,
    M_W_B_HCL: 1400,
    amt: 2400
  },
  {
    name: "Feb",
    M_W_B: 1398,
    M_W_B_HCL: 1200,
    amt: 2210
  },
  {
    name: "Mar",
    M_W_B: 2800,
    M_W_B_HCL: 1400,
    amt: 2290
  },
  {
    name: "Apr",
    M_W_B: 2008,
    M_W_B_HCL: 1900,
    amt: 2000
  },
  {
    name: "May",
    M_W_B: 2300,
    M_W_B_HCL: 1800,
    amt: 2181
  },
  {
    name: "Jun",
    M_W_B: 1800,
    M_W_B_HCL: 100,
    amt: 2500
  },
  {
    name: "Jul",
    M_W_B: 2300,
    M_W_B_HCL: 800,
    amt: 2100
  },
  {
    name: "Aug",
    M_W_B: 2398,
    M_W_B_HCL: 2200,
    amt: 2210
  },
  {
    name: "Sep",
    M_W_B: 2400,
    M_W_B_HCL: 2280,
    amt: 2290
  },
  {
    name: "Oct",
    M_W_B: 2408,
    M_W_B_HCL: 2200,
    amt: 2000
  },
  {
    name: "Nov",
    M_W_B: 1500,
    M_W_B_HCL: 1300,
    amt: 2290
  },
  {
    name: "Dec",
    M_W_B: 2300,
    M_W_B_HCL:2240,
    amt: 2100
  },
];


const BarChart2 = ({yUnit}) => {
    return (
        <BarChart
          width={540}
          height={160}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          barGap={0}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="amt"
          label={{ value: yUnit, angle: -90, position: "insideLeft" }}
          tick={{ dy: 5 }} 
          width={60} 
           />
          <Tooltip />
          <Bar dataKey="M_W_B" fill="#153373" />
          <Bar dataKey="M_W_B_HCL" fill="var(--color-theme-grey)" />
          <Bar dataKey="amt" fill="#ffc000" />
        </BarChart>
      );
}

export default BarChart2
