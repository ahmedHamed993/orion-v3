'use client'
import { getUserOrders } from '@/api-calls/user/getUserOrders';
import React, { useState, useEffect } from 'react'

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getOrders = async ()=>{
        const data = await getUserOrders();
        console.log('data',data);
        setOrders(data);
    }
    useEffect(()=>{
        getOrders();
    },[])
  return (
    <div>
      orders
    </div>
  )
}

export default UserOrders
