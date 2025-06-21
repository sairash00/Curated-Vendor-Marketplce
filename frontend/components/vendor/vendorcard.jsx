import React from 'react'

const VendorCard = () => {
  return (
    <div className='px-5 py-1 border border-gray-400 rounded-xl items-center justify-around flex h-[30vh] ' >
        <div className='w-30 h-30 rounded-full bg-gray-300 '></div>
        <div className='flex max-w-[50%] flex-col gap-2 '>
            <h1 className='text-lg font-semibold '>Name Vendor</h1>
            <p className='text-sm  text-gray-500'>Description of the vendor goes here. It can be a brief overview of the services or products offered.</p>
            <p className='text-sm font-semibold text-gray-500'>Location: City, Country</p>
        </div>
    </div>
  )
}

export default VendorCard