import { Item } from '@/types/types'
import Image from 'next/image'
import React, { useState } from 'react'
import {FiPlus, FiMinus} from "react-icons/fi"
type Props = {
    item:Item
}

const CartListItem = ({item}: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const incQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  const decQuantity = () => {
    if(quantity > 1){
      setQuantity(prev => prev - 1)
    }
  }
  return (
    <div className='flex items-center gap-2 py-2'>
      <img src={item.img } alt={item.name} width={'100px'} height={"75px"} className='rounded-md overflow-hidden object-cover w-[100px] h-[75px]' />
      <div>
        <div className='flex flex-col justify-between items-start'>
          <h6 className='font-semibold truncate'>{item.name}</h6>
          <p className='font-bold'>{item.final_price} د.ل</p>
        </div>
        <div className='flex items-center gap-2 w-fit'>
          <button onClick={incQuantity} className='flex justify-center items-center h-6 w-6 bg-slate-900 text-slate-50 rounded-full'><FiPlus /></button>
          <input className='w-10 text-center' type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={decQuantity} className='flex justify-center items-center h-6 w-6 bg-slate-900 text-slate-50 rounded-full'><FiMinus /></button>
        </div>
      </div>
    </div>
  )
}

export default CartListItem