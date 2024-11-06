import React from 'react'
import MultiColoredBarChart from '../../../Charts/MultiColoredBarChart'
import { Card, Typography, Button } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const ProductionQuantity = ({chartData}) => {
  return (
    <div>
     {/* <ReactApexChart options={ChartData.options} series={ChartData.series} type="bar" height={350} /> */}
     <Card className="w-[40rem] h-[17.5rem]">
     <MultiColoredBarChart chartData={chartData}/>
     </Card>
    </div>
  )
}

export default ProductionQuantity
