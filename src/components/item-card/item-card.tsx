import { Item } from '@/types/types'
import React from 'react'
import CardAddToCart from './card-add-to-cart'
import { getMeta } from '@/api-calls/meta'

type Props = {
  item:Item
}

const ItemCard = async ({item}: Props) => {
  const meta = await getMeta();
  const primaryColor = meta?.vendor?.color_primary;
  return (
    <div className='shadow-md rounded-md border-[1px] border-slate-200 p-2 flex flex-col'>
      <img src={item?.img} style={{aspectRatio:"16/9", width:"100%", objectFit:"contain"}} alt={item.name} /> 
      <div className="p-2 flex flex-col flex-1">
        <div className='flex justify-between items-center gap-4 mb-2' title={item.name}>
          <h6 className='truncate font-semibold'>{item.name}</h6>
          <p className='font-bold text-xl min-w-fit'>{item.final_price} د.ل</p>
        </div>
        <div className='flex flex-col justify-between flex-1 gap-2'>
          <p className=' line-clamp-2 ' >{item.description}</p>
          <CardAddToCart item={item} primaryColor={primaryColor||"#333"} />
        </div>
      </div>
    </div>
  )
}

export default ItemCard