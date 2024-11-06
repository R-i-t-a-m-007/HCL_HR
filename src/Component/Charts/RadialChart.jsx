import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export const RadialChart = ({ data, COLORS }) => {
  return (
    // <ResponsiveContainer className="w-[17rem] h-full">
    <div className="w-[170px] h-full">
      <ResponsiveContainer>
        {/* <PieChart width={202} height={200}> */}
        <PieChart style={{width: 200}}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={63}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
