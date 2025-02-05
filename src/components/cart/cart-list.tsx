import { Item } from '@/types/types'
import React from 'react'
import CartListItem from './cart-list-item'
import Image from 'next/image'

const CartList = () => {
  return (
    <div className='flex flex-col divide-y-2 divide-y-slate-300'>
      {
        items?.length ? items.map((item:Item) => {
            return (
                <CartListItem key={item.id} item={item} />
            )
        }):  <Image
        src="/images/empty-cart.png"
        width={200}
        height={200}
        alt="empty cart"
        className="text-center mx-auto"
      />
      }
    </div>
  )
}

export default CartList
const items:any = [
    {
        id:"1",
        name:"product name",
        quantity:2,
        final_price:20,
        img:"https://placehold.co/600x400",
    },
    {
        id:"2",
        name:"product name",
        quantity:1,
        final_price:20,
        img:"https://placehold.co/600x400",
    },
    {
        id:"3",
        name:"product name",
        quantity:2,
        final_price:20,
        img:"https://placehold.co/600x400",
    },
]