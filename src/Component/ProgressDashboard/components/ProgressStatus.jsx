import React from 'react'
import { TimeLine } from './TimeLine'

export const ProgressStatus = ({ selectedTask }) => {
  return (
    <div className='progressStatus bg-white rounded-xl p-4' style={{marginTop: 12}}>
        <TimeLine start='23/3' actualStart='26/3' end='27/3' actualEnd='30/3'  />
    </div>
  )
}