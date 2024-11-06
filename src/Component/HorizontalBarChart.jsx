import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const HorizontalBarChart = ( {barData, param1, key1, param2, key2, colors, yLabel=undefined} ) => {

  const getVal = () => {
    return {
      series: [
        {
            name: param1, 
            data: barData.map((data) => data[key1]),
          },
          {
            name: param2, 
            data: barData.map((data) => data[key2]),
          },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
            colors: {
                ranges: [{
                  from: 0,
                  to: 40,
                }, {
                  from: 41,
                  to: 100,
                }],
              },
          }
        },
        colors: colors,
        dataLabels: {
          enabled: false,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          }
        },
        
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: barData.map((data) => data[yLabel] ),
          labels: {
            formatter: function (value) {
              return value / 1000 + 'k';
            },
          },
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    if(value === "Ramp from -60 mRL to -110 mRL") {
                      return "Ramp"
                    }
                    if(value === "Associated Dev. (LB, level sump, Cross over, Subsection)") {
                      return "Associated Dev."
                    }
                    if(value.toString().includes("Developments")) {
                      return value.replace("Developments", "Dev.")
                    }
                    if(value.toString().includes("Development")) {
                      return value.replace("Development", "Dev.")
                    }
                    return value; 
                },
                style: {
                  fontWeight: 600,
                  color: "rgb(107 114 128)"
                }
            },
            // title: {
            //     text: yLabel, // Set your desired X-axis name here,
            //     style: {
            //         color: "#666699",
            //         fontSize:"16",
            //     }
            // },
        },
        legend:{
          show: false,
          fontSize:"14"
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
  }, [barData]);

  return (
    <div className="text-left">
      <div className="statChart flex justify-center" key={chartKey}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={380}
          width={"100%"}
        />
      </div>
    </div>
  );
};
