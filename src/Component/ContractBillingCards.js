// ContractBillingCards.js
import React from 'react';
import { useChartData } from '../context/ChartDataProvider';

const ContractBillingCards = ({ numCards }) => {
  const { contractBillingData } = useChartData();
  const visibleData = contractBillingData.slice(0, numCards);

  return (
    <div className='grid gap-3 lg:grid-cols-6 md:grid-cols-3 w-full mt-1 billingCard py-2'>
      {visibleData.map((d, idx) => {
        let index = idx + 1;
        return (
          <div key={d.name + index} className="card p-8 px-4 rounded-lg font-semibold flex align-middle justify-between bg-white">
            {d.name === "" ? (
              <p>Inputs required {index++}</p>
            ) : (
              <>
                <div className='w-full'>
                  <p className='text-sm'>{d.name}</p>
                  <p className='mainVal'>{d.val}</p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContractBillingCards;
