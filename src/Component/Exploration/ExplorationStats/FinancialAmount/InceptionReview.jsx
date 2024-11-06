import React, { useEffect, useState } from "react";
import { Label } from "../../../Label";
import CustomLegend from "../../../CustomLegend";
import LineChartComponent from "../../../LineChart2";
import { useExplorationData } from "../../../../context/ExplorationDataProvider";
import { CustomCard } from "../../Layout/CustomCard";

export const InceptionReview = () => {
  const { formattedDrillingInceptionChartData, getFormattedAmount } =
    useExplorationData();
  const chartData = formattedDrillingInceptionChartData;

  const getAchievedPercentage = () => {
    let target = 0;
    let achieved = 0;
    chartData.forEach((data) => {
      target += data.Target;
      achieved += data.Achieved;
    });
    if (target > 0) {
      return getFormattedAmount(((achieved / target) * 100).toFixed(2));
    }
    return 0;
  };

  const [achievedPercentage, setAchievedPercentage] = useState(0);

  useEffect(() => {
    const data = getAchievedPercentage();
    setAchievedPercentage(data);
  }, [chartData]);

  return (
    <CustomCard>
      <Label>Drilling Work Status from Inception to till date</Label>

      <div className="ml-10">
        {/* <LineBar width={700} yUnit={"USD"} /> */}
        {chartData.length > 0 ? (
          <>
            <LineChartComponent data={chartData} />
            <div className="flex">
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
                type={"inception"}
              />
              <div>
                <strong>Achieved - </strong>
                <span className="font-semibold text-[#64A33F]">
                  {achievedPercentage} %
                </span>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-base text-center pt-20">No data available</h2>
        )}
      </div>
    </CustomCard>
  );
};
