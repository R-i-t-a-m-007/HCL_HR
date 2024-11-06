import React from 'react'
import ReactApexChart from 'react-apexcharts'

export const StackedBarChart = ({ data, ...props }) => {
  return (
    <div {...props}>
        <ReactApexChart options={data.options} series={data.series} type="bar" width={"100%"} height={250} />
    </div>
  )
}
// width={350} height={250}