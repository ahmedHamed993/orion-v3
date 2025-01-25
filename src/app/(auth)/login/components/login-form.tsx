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
    InputOTPSlot,
} from "@/components/ui/input-otp";
import LoginImage from './login-image';
import { getContrastColor } from '@/lib/getContrastColor';
import { getOtp } from '@/api-calls/login/getOtp';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
type Props = {
    logo:string;
    primaryColor:string;

}
const LoginForm = ({logo, primaryColor}:Props) => {
    const [phase, setPhase] = useState<"phone"|"otp">("phone");
    const contrastColor = getContrastColor(primaryColor);
    const router = useRouter();
    const {register,handleSubmit, setValue, getValues}=useForm({
        defaultValues:{
            phone:"",
        }
    });
    const login:SubmitHandler<Record<string,any>> = async (values)=>{
        try{

            const otpResponse = await getOtp(values?.phone);
            if(otpResponse?.exists){
                setPhase("otp")
                toast.success(otpResponse?.message);
                toast.success(otpResponse?.pin,{
                    autoClose:10000,
                });
                setPhase("otp")
                return;
            }
            toast.success(otpResponse?.message);
            toast.success(otpResponse?.pin,{
                autoClose:10000,
            });
            setPhase("otp");
        }catch(error){
            toast.error((error as any)?.message)
        }

    }

    const {register:registerOtp, handleSubmit:handleSubmitOtp, watch:watchOtp, setValue:setValueOtp} = useForm({
        defaultValues:{
            otp:"",
        }
    });
    const submitOtp:SubmitHandler<Record<string,any>> = async (values) => {
        const data = {...values};
        data['phone'] = getValues("phone");
        const signInResponse = await signIn('login',{...data, redirect:false, callbackUrl:"/login", });
        if(!signInResponse?.ok){
            toast.error(signInResponse?.error);
        } else {
            router.push("/");
            toast.success('welcome');
        }
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 w-full max-w-md relative'>
            <img src={logo} height={'200px'} alt={'app logo'} style={{height:"200px", width:"auto", objectFit:"contain"}} />
            {phase === 'phone' && <form className='flex flex-col gap-4' onSubmit={handleSubmit(login)}>
                <PhoneInput onChange={(value)=>setValue("phone",value)} className='flex'/>
                <button 
                    type='submit' 
                    className=' text-slate-50 p-2 rounded-md'
                    style={{backgroundColor:primaryColor, color:contrastColor}}
                >
                    ارسال رمز التحقق
                </button>
            </form>}
            {phase === 'otp' && 
                <form className='flex flex-col gap-4' onSubmit={handleSubmitOtp(submitOtp)}>
                    <InputOTP maxLength={6} value={watchOtp("otp")} onChange={(newVal)=> setValueOtp("otp",newVal)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <button 
                        type='submit' 
                        className=' text-slate-50 p-2 rounded-md'
                        style={{backgroundColor:primaryColor, color:contrastColor}}
                    >
                        تسجيل الدخول
                    </button>
                </form>
            }
        </div>
    </div>
  )
}

export default LoginForm;

