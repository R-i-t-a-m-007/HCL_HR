import React from "react";
import {
  CartesianGrid,
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const SimpleLineChart = ({
  chartData,
  xDataKey,
  lineDataKey,
  ...props
}) => {
  return (
    <ResponsiveContainer 
      width="99%" 
      // height="100%"
      height={props.height-30}
    >
      <LineChart
        {...props}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 7" vertical={false} />
        <XAxis
          dataKey={xDataKey}
          tickFormatter={(value) => monthNames[value - 1]}
          axisLine={false}
          tickLine={false}
        />
        <YAxis axisLine={false} tickLine={null} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={lineDataKey}
          stroke="var(--color-theme-blue)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
