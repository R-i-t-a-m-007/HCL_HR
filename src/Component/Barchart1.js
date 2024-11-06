import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// const data = [
//   {
//     name: "Jan",
//     target: 2400,
//     achieved: 1400,
//     amt: 2400
//   },
//   {
//     name: "Feb",
//     target: 1398,
//     achieved: 1200,
//     amt: 2210
//   },
//   {
//     name: "Mar",
//     target: 2800,
//     achieved: 1400,
//     amt: 2290
//   },
//   {
//     name: "Apr",
//     target: 2008,
//     achieved: 1900,
//     amt: 2000
//   },
//   {
//     name: "May",
//     target: 2300,
//     achieved: 1800,
//     amt: 2181
//   },
//   {
//     name: "Jun",
//     target: 1800,
//     achieved: 100,
//     amt: 2500
//   },
//   {
//     name: "Jul",
//     target: 2300,
//     achieved: 800,
//     amt: 2100
//   },
//   {
//     name: "Aug",
//     target: 2398,
//     achieved: 2200,
//     amt: 2210
//   },
//   {
//     name: "Sep",
//     target: 2400,
//     achieved: 2280,
//     amt: 2290
//   },
//   {
//     name: "Oct",
//     target: 2408,
//     achieved: 2200,
//     amt: 2000
//   },
//   {
//     name: "Nov",
//     target: 1500,
//     achieved: 1300,
//     amt: 2290
//   },
//   {
//     name: "Dec",
//     target: 2300,
//     achieved:2240,
//     amt: 2100
//   },
// ];


const Barchart1 = ({yUnit, data}) => {
    return (
        <BarChart
          width={530}
          height={160}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          barGap={2} 
        >
          <XAxis dataKey="month" />
          <YAxis 
          label={{ value: yUnit, angle: -90, position: "insideLeft" }}
          tick={{ dy: 5 }} 
          width={60} 
           />
          <Tooltip />
        
          <Bar dataKey="target" fill="var(--deepblue)" />
          
          <Bar dataKey="achieved" fill="var(--color-theme-yellow)" />

         
        </BarChart>
      );
}

export default Barchart1
