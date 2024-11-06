import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'

const Statistics = () => {
  return (
    <div className='h-screen w-full flex'>
      <Sidebar/>

      <div className='w-full'>
    <Navbar/>
    </div>

    </div>
  )
}

export default Statistics
