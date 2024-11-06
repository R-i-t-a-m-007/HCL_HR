import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 50 },
  { name: "Balance", value: 50 }
];

const COLORS = ["#8884d8", "#82ca9d"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip font-bold">
        <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const PercentageChart = () => {
  return (
    <PieChart width={273} height={150}>
      <Pie
        data={data}
        cx={120}
        cy={70}
        innerRadius={40}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

export default PercentageChart;
