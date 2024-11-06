import React from "react";
// import { DistributionCard } from "../../CardLayout/DistributionCard";
import { DistributionCard } from "./DistributionCard.jsx";
import { useExplorationData } from "../../../context/ExplorationDataProvider";

export const ExplorationCards = () => {
  const {
    billPerMonth,
    billPerMonthSelected,
    setBillPerMonthSelected,
    MONTHS,
    billPerFY,
    billPerFYSelected,
    setBillPerFYSelected,
    billFromInception,
    FINANCIAL_YEAR_LIST,
    capexPerFYSelected,
    setCapexPerFYSelected,
    capexPerFY,
    getFormattedAmount
  } = useExplorationData();

  const getBillPercentage = (billRaised, paymentMade) => {
    if (paymentMade > 0) {
      return Math.round((paymentMade / billRaised) * 100);
    }
    return 0;
  };
  const data = [
    {
      label: "Monthly Bill",
      total: `${getBillPercentage(
        billPerMonth.billRaised,
        billPerMonth.paymentMade
      )}%`,
      dropdown: {
        _options: MONTHS,
        value: billPerMonthSelected,
        setter: setBillPerMonthSelected,
      },
      type: "distribution",
      sub: [
        {
          label: "Bill Raised",
          val: getFormattedAmount(billPerMonth.billRaised && billPerMonth.billRaised.toFixed(2)),
          num: billPerMonth.billRaised && billPerMonth.billRaised.toFixed(2)
        },
        {
          label: "Payment Made",
          val: getFormattedAmount(billPerMonth.paymentMade && billPerMonth.paymentMade.toFixed(2)),
          num: billPerMonth.paymentMade && billPerMonth.paymentMade.toFixed(2)
        },
      ],
    },
    {
      label: "FY",
      total: `${getBillPercentage(
        billPerFY.billRaised,
        billPerFY.paymentMade
      )}%`,
      dropdown: {
        _options: FINANCIAL_YEAR_LIST,
        value: billPerFYSelected,
        setter: setBillPerFYSelected,
      },
      type: "distribution",
      sub: [
        {
          label: "Bill Raised",
          val: getFormattedAmount(billPerFY.billRaised && billPerFY.billRaised.toFixed(2)),
          num: billPerFY.billRaised && billPerFY.billRaised.toFixed(2)
        },
        {
          label: "Payment Made",
          val: getFormattedAmount(billPerFY.paymentMade && billPerFY.paymentMade.toFixed(2)),
          num: billPerFY.paymentMade && billPerFY.paymentMade.toFixed(2)
        },
      ],
    },
    {
      label: "Bill from Inception",
      total: `${getBillPercentage(
        billFromInception.billRaised,
        billFromInception.paymentMade
      )}%`,
      type: "distribution",
      sub: [
        {
          label: "Bill Raised",
          val: getFormattedAmount(billFromInception.billRaised && billFromInception.billRaised.toFixed(2)),
          num: billFromInception.billRaised && billFromInception.billRaised.toFixed(2)
        },
        {
          label: "Payment Made",
          val: getFormattedAmount(billFromInception.paymentMade && billFromInception.paymentMade.toFixed(2)),
          num: billFromInception.paymentMade && billFromInception.paymentMade.toFixed(2)
        },
      ],
    },
    {
      label: "Capex",
      total: `${getBillPercentage(
        capexPerFY.billRaised,
        capexPerFY.paymentMade
      )}%`,
      dropdown: {
        _options: FINANCIAL_YEAR_LIST,
        value: capexPerFYSelected,
        setter: setCapexPerFYSelected,
      },
      type: "distribution",
      sub: [
        {
          label: "Target",
          val: getFormattedAmount(capexPerFY.billRaised && capexPerFY.billRaised.toFixed(2)),
          num: capexPerFY.billRaised && capexPerFY.billRaised.toFixed(2)
        },
        {
          label: "Achieved",
          val: getFormattedAmount(capexPerFY.paymentMade && capexPerFY.paymentMade.toFixed(2)),
          num: capexPerFY.paymentMade && capexPerFY.paymentMade.toFixed(2)
        },
      ],
    },
  ];
  return (
    <div className="flex w-full justify-between gap-2">
      {data.map((d) => (
        <DistributionCard key={d.label} data={d} width="22" showSvg={true} />
      ))}
    </div>
  );
};
