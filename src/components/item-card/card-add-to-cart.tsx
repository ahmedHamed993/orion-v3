'use client';
import { Item } from '@/types/types'
import React from 'react'
import { ShoppingCart, ScrollText, User} from 'lucide-react';
import { getContrastColor } from '@/lib/getContrastColor';

type Props = {
  item:Item;
  primaryColor:string;
}

const CardAddToCart = ({item, primaryColor}: Props) => {
  const primaryColorContrast = getContrastColor(primaryColor)
  return (
    <button className='w-full py-2 rounded-md font-semibold flex justify-center items-center gap-4' style={{backgroundColor:primaryColor, color:primaryColorContrast}}>
      <ShoppingCart />
      <span>اضف الي السلة</span>
    </button>
  )
}

export default CardAddToCart