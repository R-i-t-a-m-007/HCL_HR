import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Sep',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Oct',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Nov',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width={580} height={220}>
      <LineChart
        data={data}
        margin={{
          top: 50,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      > 
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#153373"  strokeWidth={2} />
        <Line type="monotone" dataKey="uv" stroke="#ffc000" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
