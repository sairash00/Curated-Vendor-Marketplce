import React from 'react'
import VendorCard from '@/components/vendor/vendorcard.jsx'
const page = () => {
  return (
    <div className='px-5 xl:px-12 py-5 '>
        <div>All Vendors.</div>
        <div className='grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Vendor cards will be rendered here */}
          <VendorCard />
        </div>
    </div>
  )
}

export default page