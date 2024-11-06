import React from "react";
import ReactApexChart from "react-apexcharts";

export const RadialBar = ({ val, height, label ,colors="var(--color-theme-blue)"}) => {
  const data = {
    series: [val],
    colors,
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            border: "1px solid #fac5c7",
            name: {
                fontSize: '18px',
                color: colors,
                // fontFamily: 'SegoeUI',
                // offsetY: 20,
            },
            value: {
              offsetY: 10,
              fontSize: '18px',
              color: "black",
              // offsetY: 20,
            }
          },
          hollow: {
            size: "60%",
          },
          track: {
            color: '#1cbd00'
          },
          
        },
      },

      fill: {
        opacity: 1.5,
        colors: ['var(--color-theme-blue)'],
        // type: 'gradient',
        // gradient: {
        //     gradientToColors: ['#ff5e62'],
        //     shadeIntensity: 1,
        //     opacityFrom: 1,
        //     opacityTo: 2,
        //     stops: [0, 50, 100],
        //     inverseColors: false
        // },
    },
      labels: [label]
    },
  };
  return (
    <div className="radialBar">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={height}
      />
    </div>
  );
};
