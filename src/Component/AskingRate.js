import React from 'react'

const AskingRate = ({val}) => {
  return (
    <div className="mx-0 mt-20 p-4 shadow-lg h-28 px-3 border rounded-xl bg-neutral-100 font-semibold text-center">
        <p className='text-sm'>Asking Rate Per Day</p>
        <p className="text-lg font-bold ">
            <span className="text-sm text-gray-700"></span>INR {val}
        </p>
    </div>
  )
}

export default AskingRate