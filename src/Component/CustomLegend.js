import React from 'react'

const CustomLegend = ({leg1, leg2,leg3, col1, col2,col3, type}) => {
  const margin = type === 'inception' ? 'mx-10' : ''
  return (
    <div className={`flex gap-4 graphLegend ${margin}`}>
        <div className={`flex items-center justify-center`}>
            <p className={`h-3 w-3 mx-1 ${col1}`} style={{background: col1}}> </p>
            <p className='mt-0'>{leg1}</p>
        </div>
        {
          leg2 &&      
          <div className={`flex mx-2 items-center justify-center`}>
              <p className='h-3 w-3 mx-1' style={{background: col2}}> </p>
              <p className='mt-0'>{leg2}</p>
          </div>
        }
        {
          leg3 &&
          <div className={`flex mx-2 items-center justify-center`}>
              <p className='h-3 w-3 mx-1' style={{background: col3}}> </p>
              <p>{leg3}</p>
          </div>
        }
    </div>
  )
}

export default CustomLegend