import React from "react";
import { useChartData } from "../../../context/ChartDataProvider";
import { CustomDropdown } from "../../CustomDropdown";

export const DropdownGroups = () => {
	const {
		MINES,
		UNITS,
		CONTRACTS,
		mine,
		setMine,
		unit,
		setUnit,
		contract,
		setContract,
		currMines
	  } = useChartData();

	const dropdownList = [
		{
			value: unit,
			setter: setUnit,
			options: UNITS,
		},
		{
			value: mine,
			setter: setMine,
			options: currMines
		},
		{
			value: contract,
			setter: setContract,
			// options: contract ? contract : CONTRACTS
			options: contract
		}
	];

  return (
    <div className="paramSelectorDropdowns flex gap-2 py-2">
		{
			dropdownList.map((item, idx) => {
				if(Array.isArray(item.options)) {
					return <CustomDropdown key={idx} type="" name="minesDropdown" className="contractName" value={item.value} setter={item.setter} options={item.options} />
				}
				return <span className="contractName" key={idx}>{item.options}</span> 
			}
			)
		}
    </div>
  );
};
