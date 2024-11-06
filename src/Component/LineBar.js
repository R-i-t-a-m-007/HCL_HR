import React from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import generateDate from "./Data/generateDate";

const data = generateDate(7);

const LineBar = ({width, yUnit}) => (
  <div style={{ width: width, height: 160 }}>
    <ResponsiveContainer>
      <ComposedChart
        width={width}
        height={160}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid stroke="#f5f5f5" vertical={false} />
        <XAxis
          dataKey="date"
          interval={1}
          // tickLine={false}
          // axisLine={{ stroke: "#ffc000" }}
        />
        <Tooltip />
        <Bar
          radius={[0, 0, 0, 0]}
          dataKey="items"
          barSize={15}
          fill="#153373"
          yAxisId="left"
          legendType="rect"
          name="Budget"
        />
        <Line
          dot={true}
          strokeWidth={3}
          // strokeLinecap="round"
          type="monotone"
          dataKey="spent"
          stroke="#ffc000"
          yAxisId="right"
          legendType="rect"
          name="Actual"
        />
        <YAxis
          // tickLine={false}
          yAxisId="left"
          // axisLine={{ stroke: "#f5f5f5" }}
          domain={[5, "dataMax + 5"]}
          tickCount={5}
          label={{ value: yUnit, angle: -90, position: "insideLeft" }}  
        />
        <YAxis
          tickLine={false}
          yAxisId="right"
          orientation="right"
          stroke="transparent"
          axisLine={{ stroke: "transparent" }}
          // unit="K"
          domain={[5, "dataMax + 5"]}
          tickCount={5}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default LineBar;