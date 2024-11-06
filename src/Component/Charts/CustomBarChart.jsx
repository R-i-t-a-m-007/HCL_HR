import React from 'react'
import { Bar, CartesianGrid, LabelList, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart } from 'recharts';

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" /> */}
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export const CustomBarChart = ({ data, customizedLabel, height="90%", barCount=1, size, legend=true, key1="male", key2="female", ...props }) => {
  return (
    <ResponsiveContainer width="99%" height={height} {...props}>
        <BarChart
          width={size.w}
          height={size.h}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" fontSize={14} fontWeight={700} />
          {/* <YAxis tick={false} axisLine={false} label={{ value: 'No. of Employees', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle',fill:"#000000", marginRight: -10}}} /> */}
          <Tooltip />
          {
            legend && <Legend />
          }
          <Bar dataKey={key1} fill="#002060" minPointSize={10} barSize={18} label={customizedLabel}>
            <LabelList dataKey="male" content={renderCustomizedLabel} />
          </Bar>
          {
            barCount === 2 &&
            <Bar dataKey={key2} fill="#FFA800" minPointSize={10} barSize={18}>
              <LabelList dataKey="female" content={renderCustomizedLabel} />
            </Bar>
          }
        </BarChart>
    </ResponsiveContainer>
  )
}
