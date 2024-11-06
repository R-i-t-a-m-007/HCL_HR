import React from 'react'
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export const StackedBarChart2 = ({ data, customizedLabel, legend=true, size }) => {
    const CustomLabel = customizedLabel
  return (
    <ResponsiveContainer width="100%" height="70%">
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
          <Tooltip />
          { legend && <Legend /> }
          <Bar dataKey="male" fill="#002060" minPointSize={10} barSize={20} stackId={1} />
          <Bar dataKey="female" fill="#FFA800" minPointSize={10} barSize={20} stackId={1} />

          <LabelList dataKey="male" content={<CustomLabel />} />
            <LabelList dataKey="female" content={<CustomLabel />} />
        </BarChart>
    </ResponsiveContainer>
  )
}
