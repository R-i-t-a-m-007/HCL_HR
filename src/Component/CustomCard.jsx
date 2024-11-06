import React from 'react'

export const CustomCard = ({ children, width, height=16.5,...props }) => {
  return (
    <div className={`bg-white h-[${height}rem] mt-3 rounded-xl py-2 relative shadow-custom-shadow `} style={{width: width ? `${width}rem` : "100%"}}{...props}>
        {children}
    </div>
  )
}
