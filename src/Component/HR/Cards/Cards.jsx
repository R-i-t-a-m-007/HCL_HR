import React from "react";
import EmployeeStatus from "./EmployeeStatus";
import { useHRData } from "../../../context/HRDataProvider";
import { DistributionCard } from "./DistributionCard";

export const Cards = () => {
  const {
    employeeCount: {
      executives = 0,
      technical = 0,
      "non-technical": nonTechnical = 0,
    },
    disabilityStatus: {
      handicapped: disabled = 0,
      non_handicapped: nonDisabled = 0,
    },
    categoryCount: { general = 0, sc = 0, st = 0, obc = 0 },
    // positionCount: { junior = 0, senior = 0, intermediate = 0, trainee = 0 },
  } = useHRData();

  const data = [
    {
      label: "Total Attendance",
      total: 400,
      type: "distribution",
      sub: [
        {
          label: "Executives",
          val: 100,
        },
        {
          label: "Non-Executives",
          val: 300,
        },
      ],
    },
    {
      label: "Employee Disability Status",
      type: "status",
      sub: [
        {
          label: "Disabled",
          val: disabled,
        },
        {
          label: "Non-disabled",
          val: nonDisabled,
        },
      ],
    },
    {
      label: "Category",
      type: "status",
      sub: [
        {
          label: "GEN",
          val: general,
        },
        {
          label: "SC",
          val: sc,
        },
        {
          label: "ST",
          val: st,
        },
        {
          label: "OBC",
          val: obc,
        },
      ],
    },
    // {
    //   label: "Number of Employees",
    //   total: executives + technical + nonTechnical,
    //   type: "distribution",
    //   sub: [
    //     {
    //       label: "Executives",
    //       val: executives,
    //     },
    //     {
    //       label: "Non-Executives",
    //       val: technical + nonTechnical,
    //     },
    //   ],
    // },
  ];
  return (
    <div 
      // className="hrCards grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 space-y-3 justify-between gap-12"
      className="hrCards grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 space-y-3 justify-between gap-12"
    >
      {data.map((cardData) =>
        cardData.type === "distribution" ? (
          <DistributionCard key={cardData.label} data={cardData} />
        ) : (
          <EmployeeStatus key={cardData.label} data={cardData} />
        )
      )}
    </div>
  );
};
