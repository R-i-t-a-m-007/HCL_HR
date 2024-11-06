import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  {
    name: "Apr",
    Target: 2780,
    Achieved: 3908,
    amt: 2000,
  },
  {
    name: "May",
    Target: 1890,
    Achieved: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    Target: 2390,
    Achieved: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    Target: 3490,
    Achieved: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    Target: 3000,
    Achieved: 1398,
    amt: 2210,
  },
  {
    name: "Sep",
    Target: 2000,
    Achieved: 9800,
    amt: 2290,
  },
  {
    name: "Oct",
    Target: 2780,
    Achieved: 3908,
    amt: 2000,
  },
  {
    name: "Nov",
    Target: 2000,
    Achieved: 9800,
    amt: 2290,
  },
  {
    name: "Dec",
    Target: 3490,
    Achieved: 4300,
    amt: 2100,
  },
  {
    name: "Jan",
    Target: 4000,
    Achieved: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    Target: 3000,
    Achieved: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    Target: 2000,
    Achieved: 9800,
    amt: 2290,
  },
];

const LineChartComponent = ({data = chartData}) => {
  const formatYAxis = (tick) => {
    return tick >= 1000 ? `${(tick / 1000).toFixed(1)} k` : tick;
  };
  return (
    <ResponsiveContainer width={500} height={220}>
      <LineChart
        data={data}
        margin={{
          top: 50,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        {/* <YAxis yAxisId="right" orientation="right" /> */}
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="Target"
          stroke="#002060"
          fill="#002060"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Achieved"
          stroke="#FFC000"
          fill="#FFC000"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
