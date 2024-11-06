import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Label } from './Label';

const initialMiningBillingData = [
  {
    name: "Grade Daily (%)",
    par: "(Actual/Target)",
    actual: "0.85",
    target: "0.90",
    val: "0.85/0.90",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100
  },
  {
    name: "Grade Monthly (%)",
    par: "(Actual/Target)",
    actual: "0.89",
    target: "0.95",
    val: "0.89/0.95",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100
  },
  {
    name: "Grade Cum. (%)",
    par: "(Actual/Target)",
    actual: "0.92",
    target: "0.96",
    val: "0.92/0.96",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100
  },
  {
    name: "",
    par: "",
    actual: "03",
    target: 0,
    val: "03",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100,
    type: "valOnly"
  },
  {
    name: "",
    par: "",
    actual: "05",
    target: 0,
    val: "05",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100,
    type: "valOnly"
  },
  {
    name: "",
    par: "",
    actual: "03",
    target: 0,
    val: "03",
    gap: (actual, target) => (parseFloat(target) - parseFloat(actual))*100,
    type: "valOnly"
  }
];

initialMiningBillingData.forEach(item => 
  item.gap = item.gap(item.actual, item.target).toFixed(0)
)

const BillingCards = ({type="", miningBillingData=initialMiningBillingData}) => {
 

  return (
    <div className='grid gap-2 lg:grid-cols-6 md:grid-cols-3 w-full  mt-1 bg-white  billingCard'>
      {
        miningBillingData && miningBillingData.map((d, idx) => {
          let index = idx - 2;
          return (
            <div key={d.name + idx} className=" card p-4 px-4 border rounded-xl  font-semibold flex align-middle justify-between">
              {
                d.name === "" ?
                  <p>Inputs required {index++}</p> :
                  <>
                    <div className='w-full'>
                      <Label className='text-sm'>{`${!d.type ? type+" " : ""} ${d.name}`}</Label>
                      {d.par && <Label className='text-sm w-full'>{d.par}</Label>}
                      <div className='flex justify-between w-full'>
                        <p className="text-lg font-bold value mainVal">
                        {
                          (d.type === "valOnly" ? <span className='valOnly'>{d.val}</span> : <>{d.actual && d.target && `${d.actual}/${d.target}`}</>) 
                        }
                          
                        </p>
                        {
                          (d.actual || d.target) &&
                          <div className='flex align-middle'>
                            <div className='icon mr-1' style={{ color: d.actual > d.target ? "green" : "var(--color-red)" }}>
                              {
                                d.actual > d.target ?
                                  <AiFillCaretUp /> :
                                  <AiFillCaretDown />
                              }
                            </div>
                            {d.gap && <p className='mainVal'>{d.gap}%</p>}
                          </div>
                        }
                      </div>
                    </div>
                  </>
              }
            </div>
          );
        })
      }

    </div>
  );

};


export default BillingCards
