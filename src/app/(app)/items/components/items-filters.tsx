'use client'
import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import NavbarSearch from '@/components/navbar/navbar-search'
const ItemsFilters = () => {
  const [range, setRange] = useState([0,22])
  return (
    <div>
      <div className="py-2">
       <NavbarSearch bg="#f3f3f3" />
      </div>
      <div className="py-2">
        <h6 className='font-semibold mb-2'>
          التصنيفات
        </h6>
      categories list
      </div>
      <div className="py-2">
        <h6 className='font-semibold mb-2'>
          السعر 
        </h6>
        <div className='flex flex-col gap-1'>
        {range[0]} - {range[1]}
        <Slider
          defaultValue={[0, 24]}
          max={48}
          min={0}
          step={1}
          value={range}
          onValueChange={(value) => setRange(value)}
          dir="rtl"
          // formatLabel={(value) => `${value} hrs`}
        />
        </div>
      </div>
      <button className='mt-4'>تصفية النتائج</button>
    </div>
  )
}

export default ItemsFilters
