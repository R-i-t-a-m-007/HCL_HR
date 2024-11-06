import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const HorizontalBar = ({ data, colors, categories, dependencies, width=370, height=160 }) => {
  const getVal = () => {
  
    return {
      series: [
        {
          data,
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 200,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors,
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#000']
          },
          // formatter: function (val, opt) {
          //   return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          // },
          offsetX: 260,
          dropShadow: {
            enabled: false
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories,
          labels: {
            formatter: function (value) {
              return value / 1000 + 'k';
            },
          },
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        },
        legend: {
          show: false,
          fontSize:"14",
          showForSingleSeries: true,
          customLegendItems: ['Budget', 'Actual','Remaining'],
          markers: {
            fillColors: ['#ffc000','#153373', 'var(--mauve)']
          }
        }
      },
    };
  };

  const [state, setState] = useState(() => getVal());
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const updatedState = getVal();
    setState(updatedState);
    setChartKey((prevKey) => prevKey + 1);
  }, dependencies);
  

  return (
    <div>
      <div className="statChart flex justify-center" key={chartKey}>
        <ReactApexChart options={state.options} series={state.series} type="bar" width={"120%"} height={height-20} />
      </div>
    </div>
  );
};

export default HorizontalBar;
