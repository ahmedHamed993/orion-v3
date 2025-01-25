import { getItems, getItemsWithFilters } from '@/api-calls/items'
import ItemCard from '@/components/item-card/item-card';
import Link from 'next/link';
import React from 'react'

const HomeItems = async () => {
    const items = await getItemsWithFilters({page:1,paginate:12,sorts:"rate_avg"});

  return (
    <div className="container py-12 px-4">
        <h2 className=' text-4xl mb-8 font-semibold'>المتجات الاعلي تقييماً</h2>
        <div className='grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {items?.data?.map(item => <ItemCard key={item?.id}  item={item} />)}
        </div>
        <Link href="/items" className='mt-8 block mx-auto w-fit underline underline-offset-4 text-xl font-semibold text-slate-800'>جميع المنتجات</Link>
    </div>
  )
}

export default HomeItems