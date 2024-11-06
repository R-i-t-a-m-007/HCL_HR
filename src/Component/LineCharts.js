
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const LineCharts = () => {

    const data = [
        {
          name: "Jan",
          uv: 4000,
          target: 2400,
          val2: 5600,
          progress: 7890,
          amt: 2400
        },
        {
          name: "Feb",
          uv: 3000,
          target: 1398,
          val2: 1600,
          progress: 2890,
          amt: 2210
        },
        {
          name: "Mar",
          uv: 2000,
          target: 9800,
          val2: 8660,
          progress: 2890,
          amt: 2290
        },
        {
          name: "Apr",
          uv: 2780,
          target: 3908,
          val2: 2790,
          progress: 5890,
          amt: 2000
        },
        {
          name: "May",
          uv: 1890,
          target: 4800,
          val2: 3600,
          progress: 8890,
          amt: 2181
        },
        {
          name: "Jun",
          uv: 2390,
          target: 3800,
          val2: 5600,
          progress: 4890,
          amt: 2500
        },
        {
          name: "Jul",
          uv: 3490,
          target: 4300,
          val2: 3600,
          progress: 5590,
          amt: 2100
        },
        {
          name: "Aug",
          uv: 3000,
          target: 1398,
          val2: 6700,
          progress: 8890,
          amt: 2210
        },
        {
          name: "Sep",
          uv: 2000,
          target: 9800,
          val2: 1200,
          progress: 1890,
          amt: 2290
        },
        {
          name: "Oct",
          uv: 2780,
          target: 3908,
          val2: 1600,
          progress: 5890,
          amt: 2000
        },
        {
          name: "Nov",
          uv: 2000,
          target: 9800,
          val2: 8600,
          progress: 4890,
          amt: 2290
        },
        {
          name: "Dec",
          uv: 3490,
          target: 4300,
          val2: 5500,
          progress: 9890,
          amt: 2100
        },
      ];

  return (
    <LineChart
    width={810}
    height={170}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }} 
    
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis dataKey="name" />
    {/* <YAxis /> */}
    <Tooltip />
    {/* <Legend /> */}
    <Line
      type="monotone"
      dataKey="target"
      stroke="#8884d8"
      strokeWidth={2} 
      activeDot={{ r: 8, fill: '#b7b6bf' }}
     
    />

    {/* <Line
          type="monotone"
          dataKey="val2"
          stroke="#c4c3c0"
          strokeWidth={2} 
          activeDot={{ r: 8, fill: '#b7b6bf' }}
        
        /> */}

    <Line
          type="monotone"
          dataKey="progress"
          stroke="#a03fd1"
          strokeWidth={2} 
          activeDot={{ r: 8, fill: '#b7b6bf' }}
        
        />
    
  </LineChart>
  )
}

export default LineCharts
