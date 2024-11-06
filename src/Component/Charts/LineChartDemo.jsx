import React from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { CustomizedLegend } from '../HR/EmployeePerUnit/CustomizedLegend';
const LineChartDemo = ({lineChartData}) => {
  return (
    <ResponsiveContainer className="pt-7" width="100%" height={200}>
    <LineChart 
      width={500}
      height={200}
      data={lineChartData}
      syncId="anyId"
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 0,
       
      }}
    >
      
      <XAxis dataKey="name" />
      <YAxis className="font-medium" label={{ value: 'No. of Employees', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle',fill:"#000000"}}} />
      <Tooltip />
      <Line type="monotone" dataKey="Last Month" stroke=" #002060" fill= "#002060" />
      <Line type="monotone" dataKey="This Month" stroke="#FFA800" fill="#FFA800" />
      <Legend  content={<CustomizedLegend />} layout='vertical' horizentalAlign="bottom" align="center"  /></LineChart>
  
  </ResponsiveContainer>
  )
}

export default LineChartDemo
