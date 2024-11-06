import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { useChartData } from "../context/ChartDataProvider";

const SingleLineChart = ({ colors }) => {
  const { notStarted, inProgress, completed } = useChartData();
  const getData = () => {
    return {
      series: [
        {
          name: "Not Started",
          data: [notStarted],
          dataLabels: {
            style: {
              fontSize: "18px",
              fontWeight: 600,
              color: "red", // Set custom color for "Not Started" series
            },
          },
        },
        {
          name: "In Progress",
          data: [inProgress],
        },
        {
          name: "Completed",
          data: [completed],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 110,
          width: "90%",
          stacked: true,
          colors: ["red", "red", "red"],
          fontSize: "18px",
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: false,
                offsetX: 0,
                style: {
                  fontSize: "18px",
                  fontWeight: 600,
                },
              },
            },
            position: "center",
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          labels: {
            show: false,
          },
          categories: [""],
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        fill: {
          colors: colors,
          opacity: 1,
        },
        legend: {
          show: false,
          // position: "bottom",
          // horizontalAlign: "left",
          // offsetX: 40,
          // fontSize: 14,
          // markers: {
          //   fillColors: colors, // Specify your custom legend marker colors here
          // }
        },
      },
    };
  };

  const [state, setState] = useState(() => getData());

  useEffect(() => {
    setState(getData());

    const updateLegendColors = () => {
      const legendItems = document.querySelectorAll(
        ".apexcharts-legend .apexcharts-legend-item"
      );

      legendItems.forEach((item, index) => {
        const marker = item.querySelector(".apexcharts-legend-marker");

        if (marker) {
          marker.style.background =
            state.options.legend.markers.fillColors[index];
        }
      });
    };

    // Execute the function after the chart is rendered
    updateLegendColors();
  }, [notStarted, inProgress, completed]);

  return (
    <div className="statChart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={130}
      />
    </div>
  );
};

export default SingleLineChart;
