'use client';
import React, { Dispatch, SetStateAction } from 'react';
// components 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
// next 
import Link from 'next/link';

  type Props = {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
  }
const LoginDialog = ({open,setOpen}:Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogTitle>تنبيه تسجيل الدخول</DialogTitle>
            <div>
                <p>تنويه يجب عليك تسجيل الدخول لاتمام العملية</p>
            </div>
            <div className='flex gap-4 pt-2 '>
                <Link href="/login" className='bg-slate-300 py-2 px-4 rounded-full'>تسجيل الدخول</Link>
                <button onClick={()=>setOpen(false)}>الغاء</button>
            </div>
        </DialogContent>
    </Dialog>
)
}

export default LoginDialog
