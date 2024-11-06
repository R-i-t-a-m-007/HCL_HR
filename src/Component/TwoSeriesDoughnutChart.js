import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const upperData = [
  { name: 'UpperLayer', value: 100 }, // Full value for the upper layer
];

const innerData = [
  { name: 'InnerLayer', value: 60 }, // 70% value for the inner layer
];

const COLORS = ['rgb(88 28 135)', '#067185']; // Define colors for the series

const TwoSeriesDoughnutChart = () => {
  return (
    <PieChart width={400} height={280}>
      {/* Upper Layer */}
      <Pie
        data={upperData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={110}
        paddingAngle={0}
      >
        <Cell key={`cell-0`} fill={COLORS[0]} />
      </Pie>

      {/* Inner Layer (Second Layer) */}
      <Pie
        data={innerData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={80}
        paddingAngle={0}
      >
        <Cell key={`cell-0`} fill={COLORS[1]} />
      </Pie>

      <Tooltip />
    </PieChart>
  );
};

export default TwoSeriesDoughnutChart;
