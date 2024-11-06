import React, { useState } from "react";
import { useChartData } from "../../../context/ChartDataProvider";
import { CustomDropdown } from "../../CustomDropdown";
import { useExplorationData } from "../../../context/ExplorationDataProvider";

export const ExplorationDropdowns = () => {
  const { UNITS } = useChartData();
  const { filters, setFilters, filterData, options } = useExplorationData();

  const dropdowns = [
    {
      name: "unit",
      options: options.units,
      setter: (newData) => {
        setFilters((prev) => ({
          ...prev,
          unit: newData,
        }));
      },
    },
    {
      name: "mine",
      options: options.mines,
      setter: (newData) => {
        setFilters((prev) => ({
          ...prev,
          mine: newData,
        }));
      },
    },
    {
      name: "drillingType",
      options: options.drillingTypes,
      setter: (newData) => {
        setFilters((prev) => ({
          ...prev,
          drillingType: newData,
        }));
      },
    },
    {
      name: "contractor",
      options: options.contractors,
      setter: (newData) => {
        setFilters((prev) => ({
          ...prev,
          contractor: newData,
        }));
      },
    },
  ];

  return (
    <div className="flex gap-3">
      {dropdowns.map((dropdownData) => (
        <CustomDropdown
          key={dropdownData.name}
          options={dropdownData.options}
          value={filters[dropdownData.name]}
          setter={dropdownData.setter}
          type="normal"
          className="rounded-md px-4 py-2 cursor-pointer outline-none shadow-[4px_9px_10px_0px_rgba(0,0,0,0.05)]"
        />
      ))}
    </div>
  );
};
