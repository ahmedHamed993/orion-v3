'use client'
import { getUserOrders } from '@/api-calls/user/getUserOrders';
import NoItems from '@/components/no-items/no-items';
import React, { useState, useEffect } from 'react'

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getOrders = async ()=>{
      const data = await getUserOrders();
      setOrders(data);
    }
    useEffect(()=>{
        getOrders();
    },[])
  return (
    <div className='flex flex-col'>
      {orders?.length === 0 ? <NoItems /> : orders.map(i => <p>{(i as any).id}</p>)}
    </div>
  )
}

export default UserOrders
