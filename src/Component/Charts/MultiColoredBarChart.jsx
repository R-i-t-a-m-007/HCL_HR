// import React from "react";
// import ReactApexChart from "react-apexcharts";
// const chartData = {
//   series: [
//     {
//       data: [21, 22, 10],
//     },
//   ],
//   options: {
//     chart: {
//       height: 350,
//       type: "bar",
//       toolbar:{show:false}
//     },
//     grid: {
//       show: false
//   },
//   xaxis: {
//     axisBorder: {
//       show: true,
//       color: '#78909C',
//           height: 1,
//           width: '100%',
//           offsetX: 0,
//           offsetY: 0
//     }
//   },
//     colors: ["#64A33F", "#002060", "#002060"],
//     plotOptions: {
//       bar: {
//         columnWidth: "15%",
//         distributed: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     xaxis: {
//       categories: ["John", "Joe", "Jake"],
//       labels: {
//         style: {
//           fontSize: "12px",
//         },
//       },
//       axisBorder: {
//         show: false
//       },  
//       axisTicks: {
//         show: false,
//       },
//       tickPlacement: "on", 
//     },
//   },
// };

// const MultiColoredBarChart = () => {
//   return (
//     <>
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         height={"100%"}
//       />
//     </>
//   );
// };

// export default MultiColoredBarChart;

import React from "react";
import ReactApexChart from "react-apexcharts";

const chartData = {
  series: [
    {
      data: [21, 22, 10],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: "#78909C",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
      // Keep only X-axis border, hide others
      axisTicks: {
        show: false,
      },
      tickPlacement: "on",
    },
    colors: ["#64A33F", "#002060", "#002060"],
    plotOptions: {
      bar: {
        columnWidth: "15%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["John", "Joe", "Jake"],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  },
};

const MultiColoredBarChart = () => {
  return (
    <>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={"100%"}
      />
    </>
  );
};

export default MultiColoredBarChart;

