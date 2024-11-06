import React from 'react'
import { Card, Typography, Button } from "@mui/material";
import HorizentalChart from '../../../Charts/HorizentalChart';

const MoistureContent = () => {
   const horizentalChart={
    series: [{
        data: [44, 55, 41, 64, 22, 43, 21]
      }, {
        data: [53, 32, 33, 52, 13, 44, 32]
      }],
        chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
   } 
  return (
    <Card className="w-[42rem] h-[17.5rem]">
        <div className="flex flex-col items-center">
          <Button className="bg-[#002060] h-6 text-white text-sm font-bold capitalize">
            Production
          </Button>
          <Typography className="font-semibold" variant="lead">
            Copper Grade per Month
          </Typography>
        </div>
{/* <HorizentalChart horizentalChart={horizentalChart}/>
        */}
      </Card>
  )
}

export default MoistureContent
