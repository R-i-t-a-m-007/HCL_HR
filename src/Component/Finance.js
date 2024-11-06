import React, { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'
import BadgeGroup from './BadgeGroup'
import TwoSeriesProgressChart from './ProgressChart'
import CustomLegend from './CustomLegend'
import LineChart1 from './LineChart1'
import LineBar from './LineBar'
import LineChartSingle from './LineChartSingle'
import { useChartData } from '../context/ChartDataProvider'
import FinanceBillingCards from './FinanceBillingCards'

const CHART_WIDTH = 485;

const Finance = () => {
  
  const YEARS = ["2021", "2022", "2023", "2024"];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "JUL", "AUG", "SEP", "OCT","NOV", "DEC"];

    const {oreBadgeData, UNITS, variableCostData, fixedCostData, gradeRecoveryData, setDepartment} = useChartData();

    useEffect(() => {
      setDepartment("Finance")
    }, [])
    return (
      <div className="h-screen w-full flex">
        <Sidebar />

        <div className="w-full">
          <Navbar />
          
          <div className="financeContainer flex flex-col">
            <FinanceBillingCards />

            <div className='mainContainer'>

              <div className='dashboard'>
                <div className='oreProduction'>
                  
                  <div className='percentageChart'
                  >
                    <h2 className='text-center label'>Inputs Required 1</h2>
                    <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            YEARS.map(mine => 
                              <option key={mine} value={mine}>{mine}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    <div>
                      <BadgeGroup data={oreBadgeData} />
                    </div>
                    
                    <div>
                        <TwoSeriesProgressChart target={1080} actual={980}/>   
                    </div>
                  </div>

                  <div className='productionStats'>
                    <div className='label'>
                      <p>Cost of Production</p>
                      <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            UNITS.map(mine => 
                              <option key={mine} value={mine}>{mine}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    </div>
                    <div className='graphs'>
                      <div
                      >
                        <div>
                          <LineBar width={CHART_WIDTH} yUnit={"USD"} />
                        </div>
                        <CustomLegend leg1={"Budget"} leg2={"Actual"} col1={"#153373"} col2={"#ffc000"} />
                      </div>
                    </div>
                  </div>

                  <div className='productionStats'>
                    <div className='label'>
                      <p>Grade Recovery</p>
                      <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            UNITS.map(mine => 
                              <option key={mine} value={mine}>{mine}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    </div>
                    <div className='graphs'>
                      <div
                      >
                        <div>
                          <LineChartSingle data={gradeRecoveryData} param={"grade"} width={CHART_WIDTH} yUnit={"Percent"} />
                        </div>
                        <CustomLegend leg1={"Grade"} col1={"#153373"} />
                      </div>
                    </div>
                  </div>

                </div>

                <div className='micProduction'>
                <div className='percentageChart'
                  >
                    <h2 className='text-center label'>Inputs Required 2</h2>
                    <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            MONTHS.map(mine => 
                              <option key={mine} value={mine}>{mine}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    <div>
                      <BadgeGroup data={oreBadgeData} />
                    </div>
                    
                    <div>
                        <TwoSeriesProgressChart target={1080} actual={980}/>   
                    </div>
                  </div>

                  <div className='productionStats'>
                    <div className='label'>
                      <p>Variable Cost</p>
                      <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            UNITS.map(unit => 
                              <option key={unit} value={unit}>{unit}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    </div>
                    <div className='graphs'>
                    
                      <div
                      >
                        <div>
                          <LineChart1 yUnit={"Ton"} data={variableCostData} param1={"budget"} param2={"actual"} width={CHART_WIDTH}/>
                        </div>
                        <CustomLegend leg1={"Budget"} leg2={"Actual"} col1={"#153373"} col2={"#ffc000"} />
                      </div>
                    </div>
                  </div>

                  <div className='productionStats'>
                    <div className='label'>
                      <p>Fixed Cost</p>
                      <div className='dropDown'>
                        <select name="" className='minesDropdown'
                        >
                          {
                            UNITS.map(unit => 
                              <option key={unit} value={unit}>{unit}</option>
                            )
                          }
                          
                        </select>
                      </div>
                    </div>
                    <div className='graphs'>
                    
                      <div
                      >
                        <div>
                          <LineChart1 yUnit={"Ton"} data={fixedCostData} param1={"budget"} param2={"actual"} width={CHART_WIDTH}/>
                        </div>
                        <CustomLegend leg1={"Budget"} leg2={"Actual"} col1={"#153373"} col2={"#ffc000"} />
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              </div>

          </div>
        </div>
      </div>
    )
}

export default Finance