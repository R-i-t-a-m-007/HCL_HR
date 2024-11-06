import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartSingle = ({yUnit, data, param, width}) => {
  return (
    <ResponsiveContainer width={width} height={160}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 10,
          bottom: 5,
        }}
      > 
        <XAxis dataKey="name" />
        <YAxis
        label={{ value: yUnit, angle: -90, position: "insideLeft" }}  
        tick={{ dy: 5 }} // Add padding by adjusting the dy (vertical offset)
          width={70} // Increase the width to accommodate labels
        />
        <Tooltip />
        <Line type="monotone" dataKey={param} stroke="#153373" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartSingle;
