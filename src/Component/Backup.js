import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useChartData } from '../context/ChartDataProvider';

const HorizontalBar = () => {
  const { budget, actual, mine, unit, contract, remaining } = useChartData();

  const getVal = () => {
  
    return {
      series: [
        {
          data: [budget, actual, remaining],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        colors: ['#33b2df', '#546E7A', '#d4526e'],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Budget', 'Actual', 'Remaining'], 
        },
      },
    };
  };

  const [state, setState] = useState(() => getVal());
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const updatedState = getVal();
    setState(updatedState);
    setChartKey((prevKey) => prevKey + 1);
  }, [budget, actual, mine, unit, contract, remaining]);
  

  return (
    <div>
      <div className="statChart" key={chartKey}>
        <ReactApexChart type="pie" height={170} width={400} />
      </div>
    </div>
  );
};

export default HorizontalBar;
