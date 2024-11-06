import React from 'react'
import { LuAlertCircle } from "react-icons/lu";

export const AlertMessage = ( {children} ) => {
  return (
    <h2 className='alertMessage'>
        <span className='icon pr-2'>
            <LuAlertCircle />
        </span>
        {children}
    </h2>
  )
}
