import React from 'react'

export const VerticalKeyVal = ({ data, COLORS }) => {
  return (
    <div className='w-32 font-bold leading-8'>
        {
            data.map((d, idx) =>
                <div key={d.name} className={`flex text-[${COLORS[idx]}]`} style={{color: COLORS[idx]}}>
                    <div className='min-w-[40px]'>{d.value}%</div>
                    <div>{d.name}</div>
                </div>
            )
        }
    </div>
  )
}
