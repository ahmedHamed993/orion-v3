'use client';
import { useEffect, useState } from 'react';
// next-auth 
import { signIn } from 'next-auth/react';
// form 
import { SubmitHandler, useForm } from 'react-hook-form';
// components 
import PhoneInput from './phone-input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import LoginImage from './login-image';
type Props = {
    logo:string;
    primaryColor:string;
    primaryColorContrast:string;
}
const LoginForm = ({logo, primaryColor, primaryColorContrast}:Props) => {
    const [phase, setPhase] = useState<"phone"|"otp">("phone")
    const {register,handleSubmit, setValue}=useForm({
        defaultValues:{
            phone:"",
        }
    });
    const login:SubmitHandler<Record<string,any>> = async (values)=>{
        console.log("values",values)
        // const signInResponse = await signIn('login',{...values, redirect:false, callbackUrl:"/login", });
        // console.log("signin response", signInResponse);
        setPhase("otp");
    }
    const {register:registerOtp, handleSubmit:handleSubmitOtp, watch:watchOtp, setValue:setValueOtp} = useForm({
        defaultValues:{
            otp:"",
        }
    });
    const submitOtp:SubmitHandler<Record<string,any>> = (values) => {
        console.log("values",values)
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 w-full max-w-md relative'>
            <img src={logo} height={'100px'} alt={'app logo'} style={{height:"100px", width:"auto", objectFit:"contain"}} />
            {phase === 'phone' && <form className='flex flex-col gap-4' onSubmit={handleSubmit(login)}>
                <PhoneInput onChange={(value)=>setValue("phone",value)} className='flex'/>
                <button 
                    type='submit' 
                    className=' text-slate-50 p-2 rounded-md'
                    style={{backgroundColor:primaryColor, color:primaryColorContrast}}
                >
                    ارسال رمز التحقق
                </button>
            </form>}
            {phase === 'otp' && 
                <form className='flex flex-col gap-4' onSubmit={handleSubmitOtp(submitOtp)}>
                    <InputOTP maxLength={4} value={watchOtp("otp")} onChange={(newVal)=> setValueOtp("otp",newVal)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                    <button 
                        type='submit' 
                        className='bg-sky-700 text-slate-50 p-2 rounded-md'
                    >
                        تاكيد
                    </button>
                </form>
            }
        </div>
    </div>
  )
}

export default LoginForm;

