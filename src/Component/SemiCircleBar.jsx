import React from 'react'
import ReactApexChart from 'react-apexcharts';

export const SemiCircleBar = ({val, color, gradientToColors, isPercentage=true, nonPercentageVal=undefined, ...props}) => {
    const value = val < 0 ? 0 : val;
    var options = {
        series: [value],
        chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "var(--deepblue)",
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: !isPercentage,
              color:"var(--color-theme-grey)",
              fontSize: '22px',
              fontWeight: 900
            },
            value: {
              show: isPercentage,
              offsetY: -2,
              color:"var(--color-theme-grey)",
              fontSize: '22px',
              fontWeight: 900
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        colors: [color],
      },
      labels: [`${nonPercentageVal} Days`],
      };
  return (
    <div {...props}>
        <ReactApexChart 
            options={options}
            series={options.series}
            type='radialBar'
        />
    </div>
  )
}
