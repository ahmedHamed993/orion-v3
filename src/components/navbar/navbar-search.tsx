'use client'
import React, { useState } from 'react'
// next 
import { useRouter } from 'next/navigation';
// icons 
import { Search } from 'lucide-react'
const NavbarSearch = ({bg}:{bg:string;}) => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const goSearch = ()=> router.push(`/items?search=${search}`)
    return (
        <div className='flex-1  flex items-center p-2 rounded-md border-[1px] border-slate-50/60' style={{background:bg}}>
            <input type='search' className='border-none outline-none w-full bg-transparent' placeholder='بحث...' />
            <button onClick={goSearch}>
                <Search />
            </button>
        </div>
    )
}

export default NavbarSearch