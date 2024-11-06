import React from 'react';
import { useChartData } from '../context/ChartDataProvider';

const FinanceBillingCards = () => {

  const {financeBillingData} = useChartData();

  return (
    <div className='grid gap-1 lg:grid-cols-6 md:grid-cols-3 w-full  mt-1 billingCard'>
      {
        financeBillingData && financeBillingData.map((d, idx) => {
          let index = idx-1;
          return <div key={d.name} className="p-4 px-4 border rounded-xl bg-white font-semibold flex align-middle justify-between">
            {
              d.name === "" ?
              <p>Inputs required {index++}</p>
               : 
              <>
                <div className='w-full'>
                  <p className='text-sm'>{d.name}</p>
                  <p className='mainVal'>{d.val}</p>
                </div>
              </>
            }
          </div>
        })
      }
      
    </div>
  )
}

export default FinanceBillingCards
