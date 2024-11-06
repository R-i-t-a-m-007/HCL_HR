import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";


const PieChartJs = ({ chartData, COLORS, renderCustomizedLabel }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={45}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          className="text-sm ,text-gray-500"
          wrapperStyle={{ fontSize: "12px" }}
        
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartJs;
