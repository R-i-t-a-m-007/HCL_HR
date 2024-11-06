import React from "react";
import { MonthlyWork } from "./DrillingWork/MonthlyWork";
import { FinancialYearWise } from "./DrillingWork/FinancialYearWise";
import { Inception } from "./DrillingWork/Inception";
import { MonthlyReview } from "./FinancialAmount/MonthlyReview";
import { FinancialYearWiseReview } from "./FinancialAmount/FinancialYearWiseReview";
import { InceptionReview } from "./FinancialAmount/InceptionReview";
import { useExplorationData } from "../../../context/ExplorationDataProvider";

const data = {
  ICC: {
    "8am - 4pm": [
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
  },
  KCC: {
    "8am - 4pm": [
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
  },
  MCP: {
    "8am - 4pm": [
      { name: "Network Eng.", target: 496, achieved: 250 }, // Order changed
      { name: "Drilling Eng.", target: 380, achieved: 140 }, // Order changed
      { name: "Mining Eng.", target: 910, achieved: 250 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", target: 899, achieved: 560 },
      { name: "Network Eng.", target: 496, achieved: 250 },
      { name: "Drilling Eng.", target: 380, achieved: 140 },
      { name: "DB Admin", target: 591, achieved: 100 },
      { name: "Mining Res.", target: 1205, achieved: 501 },
      { name: "Mining Eng.", target: 910, achieved: 250 },
    ],
  },
};

export const StatsSection = () => {
  const {physicalWorkPerMonth, physicalWorkPerFY, drillingStatusPerMonth, drillingStatusPerFY} = useExplorationData();

  const MonthlyWork_TARGET = physicalWorkPerMonth.target.toFixed(2);
  const MonthlyWork_ACHIEVED = physicalWorkPerMonth.achieved.toFixed(2);

  const FinancialYearWise_TARGET = physicalWorkPerFY.target.toFixed(2);
  const FinancialYearWise_ACHIEVED = physicalWorkPerFY.achieved.toFixed(2);

  const MonthlyReview_TARGET = drillingStatusPerMonth.target.toFixed(2);
  const MonthlyReview_ACHIEVED = drillingStatusPerMonth.achieved.toFixed(2);

  const FinancialYearWiseReview_TARGET = drillingStatusPerFY.target.toFixed(2);
  const FinancialYearWiseReview_ACHIEVED = drillingStatusPerFY.achieved.toFixed(2);
  return (
    <div id="exploartionCharts flex flex-col">
      <div id="drillingWork" className="flex gap-3">
        <MonthlyWork
          data={{
            target: MonthlyWork_TARGET,
            achieved: MonthlyWork_ACHIEVED,
          }}
        />
        <FinancialYearWise
          data={{
            target: FinancialYearWise_TARGET,
            achieved: FinancialYearWise_ACHIEVED,
          }}
        />
        <Inception />
      </div>
      <div id="financialWork" className="flex gap-3">
        <MonthlyReview
          data={{
            target: MonthlyReview_TARGET,
            achieved: MonthlyReview_ACHIEVED,
          }}
        />
        <FinancialYearWiseReview
          data={{
            target: FinancialYearWiseReview_TARGET,
            achieved: FinancialYearWiseReview_ACHIEVED,
          }}
        />
        <InceptionReview />
      </div>
    </div>
  );
};
