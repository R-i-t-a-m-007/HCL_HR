import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent = ({type, yUnit, data, param1, param2, width}) => {
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
        <Line type="monotone" dataKey={param1} stroke="var(--deepblue)" strokeWidth={2} />
        <Line type="monotone" dataKey={param2} stroke="var(--color-theme-yellow)" activeDot={{ r: 5 }} strokeWidth={2} /> 
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
