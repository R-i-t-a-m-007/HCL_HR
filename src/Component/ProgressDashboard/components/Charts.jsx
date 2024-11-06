import React from "react";
import { StatCard } from "./StatCard";
import SingleLineChart from "../../SingleLineChart";
import HorizontalBar from "../../HorizontalBar";
import { useChartData } from "../../../context/ChartDataProvider";
import { SemiCircleBar } from "../../SemiCircleBar";
import CustomLegend from "../../CustomLegend";

export const Charts = () => {

    const { actual, budget, daysCompleted, duration, mine, unit, contract, remaining } =
    useChartData();

  return (
    <div className="charts">
      <div className="flex flex-row gap-2">
        <StatCard label="Overall Task Progress">
          <SingleLineChart 
            colors={['var(--deepblue)', 'var(--blue)', 'var(--mauve)']}
          />
          <CustomLegend leg1="Not Started" leg2="In Progress" leg3="Completed" col1='var(--deepblue)' col2='var(--blue)' col3='var(--mauve)' />
        </StatCard>

        <StatCard label="Budget Vs Actual Vs Remaining">
          <HorizontalBar 
            data={[budget, actual, remaining]} 
            colors={['var(--blue)', 'var(--deepblue)', 'var(--mauve)']} 
            categories={['Budget', 'Actual', 'Remaining']}
            dependencies={[budget, actual, mine, unit, contract, remaining]}
          />
          <CustomLegend leg1="Budget" leg2="Actual" leg3="Remaining" col1='var(--blue)' col2='var(--deepblue)' col3='var(--mauve)' />
        </StatCard>
      </div>
      <div className="flex flex-row gap-2">
        <StatCard label={"Overall Duration Status"}>
          
          <div className="charts flex justify-evenly">
            <SemiCircleBar isPercentage={false} val={(daysCompleted && duration) ? parseInt(daysCompleted/duration*100) : 0} nonPercentageVal={daysCompleted} color={'var(--color-theme-grey)'} gradientToColors='var(--lightblue)' />
          </div>

          <CustomLegend leg1="Days Completed" leg2="Days Remaining" col1="var(--color-theme-grey)" col2="var(--deepblue)" />
        </StatCard>

        <StatCard label="Budget Spent">
          
          <div className="charts flex justify-evenly">
            <SemiCircleBar val={(actual && budget) ? parseInt(actual/budget*100) : 0} color={'var(--color-theme-grey)'} gradientToColors='var(--lightblue)' />
          </div>
          <CustomLegend leg1="Actual" leg2="Remaining" col1="var(--color-theme-grey)" col2="var(--deepblue)" />
        </StatCard>
      </div>
    </div>
  );
};
