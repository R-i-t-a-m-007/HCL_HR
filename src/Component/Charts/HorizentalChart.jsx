import React from 'react'
import ReactApexChart from 'react-apexcharts';

const HorizentalChart = ({horizentalChart}) => {
  return (
    <div className='h-full'>
    <ReactApexChart series={horizentalChart.series} height={450}   width={"100%"} type="bar" />
      
    </div>
  )
}

export default HorizentalChart
