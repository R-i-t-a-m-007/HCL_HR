import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { HorizontalBarChart } from "../../HorizontalBarChart";
import { useChartData } from "../../../context/ChartDataProvider";
import CustomLegend from "../../CustomLegend";

export const ContractDetails = ( ) => {
  // const [tabIndex, setTabIndex] = useState(0);
  const { mineData } = useChartData();
  return (
    <div 
      className="projectDetails bg-white rounded-xl p-4 font-bold text-gray-500 w-full text-left relative"
      style={{ marginBottom: "0.5rem"}}
    >
      <h2 className="text-center" style={{fontSize:"22px"}}>Overall Quantity Details</h2>

      <HorizontalBarChart 
        barData={mineData} 
        param1={"BoQ"} 
        key1={"BoQ_Qty"} 
        param2={"Actual"} 
        key2={"Act._Qty"}
        colors={['var(--deepblue)', 'var(--blue)']}
        yLabel={"Task"}
      />
      <CustomLegend leg1="BoQ" leg2="Actual" col1="var(--deepblue)" col2="var(--blue)" />
      {/* <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

        <TabList>
          <Tab>Overall Status</Tab>
          <Tab>Task Status</Tab>
        </TabList>

        <TabPanel>
          <OverallProjectDetails />
        </TabPanel>

        <TabPanel>
          <TaskDetails selectedTask={selectedTask} />
        </TabPanel>

      </Tabs> */}
    </div>
  );
};
