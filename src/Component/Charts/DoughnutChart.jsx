import React from 'react'
import ReactApexChart from 'react-apexcharts';

const DoughnutChart = ({doughnutChartData}) => {
  return (
    <div className='h-full'> 
        <ReactApexChart options={doughnutChartData.options} series={doughnutChartData.series} height={450} type="donut" /> 
    </div>
  )
}

export default DoughnutChart
