import React, { useEffect, useState } from 'react'
// actions 
import { getCheckout } from '@/api-calls/checkout/checkout';
// forms 
import {useForm} from "react-hook-form";
// icons 
import { MdAccessTime } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import PhoneInput from '@/app/(auth)/login/components/phone-input';

type FormValues = {
    customer_name:string | null;
    customer_phone:string | null;
    schedule_id:string | null;
}

const CheckoutForm = () => {
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(true);
    const {data:session} = useSession();

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}}=useForm<FormValues>({
        defaultValues:{
            customer_name:null,
            customer_phone:null,
            schedule_id:null,

        }
    })

    const getCheckoutData = async()=>{
        const data = await getCheckout();
        console.log("data",data)
        setCheckout(data);
        setLoading(false);
    };

    useEffect(()=>{
        getCheckoutData();
        reset({
            customer_name:session?.user?.name?.toString() ?? "",
        })
    },[]);

  return (
    <form className='flex flex-col gap-8'>
        <div>
            <h6>الايام المتاحة</h6>
            <div className='grid grid-cols-3 gap-2  mt-2'>
                {(checkout as any)?.available_schedules.map((schedule:any) => (
                    <div 
                        key={schedule.id} 
                        className={`flex items-center gap-2 border-[1px] p-2 rounded-md  cursor-pointer ${schedule.id == watch("schedule_id") ? " border-green-600 ":" border-slate-300 "}`} 
                        onClick={()=>setValue("schedule_id", schedule.id)}
                    >
                        <MdAccessTime /> {schedule.start_at} - {schedule.end_at}
                    </div>
                ))}
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>الاسم</p>
            <Input className='py-6' {...register("customer_name")}/>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>رقم الهاتف</p>
            <div dir='ltr'>
                <PhoneInput
                    dir='ltr'
                    onChange={(value) => setValue("customer_phone", value)}
                    className="flex"
                />
            </div>
        </div>
    </form>
  )
}

export default CheckoutForm