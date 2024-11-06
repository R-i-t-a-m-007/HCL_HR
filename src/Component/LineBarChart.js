import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';


const LineBarChart = () => {

    const data = [
        {
          name: 'Jan',
          target: 590,
          achieved: 800,
          amt: 1400,
          cnt: 490,
        },
        {
          name: 'Feb',
          target: 868,
          achieved: 967,
          amt: 1506,
          cnt: 590,
        },
        {
          name: 'Mar',
          target: 1397,
          achieved: 1098,
          amt: 989,
          cnt: 350,
        },
        {
          name: 'Apr',
          target: 1480,
          achieved: 1200,
          amt: 1228,
          cnt: 480,
        },
        {
          name: 'May',
          target: 1520,
          achieved: 1108,
          amt: 1100,
          cnt: 460,
        },
        {
          name: 'Jun',
          target: 1400,
          achieved: 680,
          amt: 1700,
          cnt: 380,
        },
        {
            name: 'Jul',
            target: 590,
            achieved: 800,
            amt: 1400,
            cnt: 490,
          },
          {
            name: 'Aug',
            target: 868,
            achieved: 967,
            amt: 1506,
            cnt: 590,
          },
          {
            name: 'Sep',
            target: 1397,
            achieved: 1098,
            amt: 989,
            cnt: 350,
          },
          {
            name: 'Oct',
            target: 1480,
            achieved: 1200,
            amt: 1228,
            cnt: 480,
          },
          {
            name: 'Nov',
            target: 1520,
            achieved: 1108,
            amt: 1100,
            cnt: 460,
          },
          {
            name: 'Dec',
            target: 1400,
            achieved: 680,
            amt: 1700,
            cnt: 380,
          },
      ];
      


  return (
   
    <ComposedChart
      width={500}
      height={200}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      {/* <CartesianGrid stroke="#f5f5f5" /> */}
      <XAxis dataKey="name" scale="band" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
      <Bar dataKey="achieved" barSize={20} fill="rgb(88 28 135)" />
      <Line type="monotone" dataKey="target" stroke="#067185" strokeWidth={2}/>
    </ComposedChart>
 
  )
}

export default LineBarChart
