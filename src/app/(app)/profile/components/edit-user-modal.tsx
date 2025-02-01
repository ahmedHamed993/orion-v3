'use client'
import React, { useState } from 'react'
// icons 
import { TbEdit } from "react-icons/tb";
// components 
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import PhoneInput from '@/app/(auth)/login/components/phone-input';
import ImageUploader from './image-uploader';
const EditUserModal = () => {
    const [values, setValues] = useState({
        img:undefined,
    })
  return (
    <>
    <Dialog>
        <DialogTrigger>
            <span className='flex justify-center items-center gap-2 bg-slate-200 text-sm rounded-full h-12 w-12 absolute top-2 right-2'>
                <TbEdit size={32} /> 
            </span>
        </DialogTrigger>
        <DialogContent dir='rtl' >
            <DialogHeader>
                <DialogTitle>تعديل البيانات الشخصية</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
                <ImageUploader value={values?.img} onChange={(value)=>console.log(value)} />
                <Input type="text" name='name' placeholder='الاسم' className='py-6'/>
                <Input type="email" name='email' placeholder='البريد الالكتروني' className='py-6' dir='ltr'/>
                <div dir='ltr'>
                    <PhoneInput />
                </div>
            </div>
        </DialogContent>
    </Dialog>
    </>
  )
}

export default EditUserModal