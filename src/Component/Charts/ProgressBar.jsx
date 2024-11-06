import React from "react";
import ReactApexChart from "react-apexcharts";

export const ProgressBar = ({ label, val, fillColor }) => {
  const data = {
    series: [val],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
          track: {
            //   background: 'var(--deepblue)',
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: true,
              color: "var(--deepblue)",
              fontSize: "14px",
              fontWeight: 700,
            },
            value: {
              show: true,
              offsetY: 10,
              color: "var(--color-theme-grey)",
              fontSize: "18px",
              fontWeight: 800,
            },
          },
        },
      },
      labels: [label],
      fill: {
        colors: [fillColor],
      },
    },
  };
  return (
    <div className="h-[85%] mb-[-38px] mt-2">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={"100%"}
      />
    </div>
  );
};
