import React, { useEffect, useState } from "react";
// actions
import { getCheckout } from "@/api-calls/checkout/checkout";
// forms
import { useForm } from "react-hook-form";
// icons
import { MdAccessTime } from "react-icons/md";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/app/(auth)/login/components/phone-input";
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoCalendarOutline } from "react-icons/io5";
import { getUserAddress } from "@/api-calls/user/getUserAddresses";
import { Address } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FormValues = {
    details:string;
    address_details:string;
    address_location:{
        type:"Point",
        coordinates:[number,number]
    };
    driver_tip:number;
  schedule_id: string | null;
  delivery_date:string;
};

const CheckoutForm = () => {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const { data: session } = useSession();
  

    const getAddresses = async ()=>{
        const data = await getUserAddress();
        setAddresses(data.data)
    }
  
    useEffect(()=>{
        getAddresses()
    },[])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      schedule_id: null,
      address_details:"",
      details:"",
      address_location:{
        "type": "Point",
        "coordinates": [
           0,0
        ],
      },
      driver_tip:0,
      delivery_date:"",
    },
  });

  const getCheckoutData = async () => {
    const data = await getCheckout();
    console.log("data", data);
    setCheckout(data);
    setLoading(false);
  };

  useEffect(() => {
    getCheckoutData();
  }, []);

  const handleCheckout = (values:any)=>{
    console.log('values',values)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCheckout)}>
        {/* address  */}
      <div>
        <p className="text-sm mb-2">العنوان</p>
        <Select
          dir="rtl"
          value={selectedAddress}
          onValueChange={(value)=>{
            setSelectedAddress(value || "");
            const currentAddress = addresses.find((i : any) => i.id === value);
            setValue("address_details", (currentAddress as any)?.details ?? "")
            setValue("address_location", (currentAddress as any)?.location ?? "")
          }}
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="العنوان" />
          </SelectTrigger>
          <SelectContent>
            {addresses?.map((address: Address) => (
              <SelectItem value={address.id}>
                {address.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
        {/* schedule  */}
      <div>
        <p className="text-sm mb-2">الموعد</p>
        <Select
          dir="rtl"
          value={watch("schedule_id") ?? undefined}
          onValueChange={(value) => {
            console.log('value',JSON.parse(value));
            // setValue("delivery_date","");
            setValue("schedule_id", value);
            setAvailableDates((JSON.parse(value) as any).available_dates || []);
            setValue("delivery_date",(JSON.parse(value) as any).available_dates?.[0]?.date);
          }}
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="الموعد" />
          </SelectTrigger>
          <SelectContent>
            {(checkout as any)?.available_schedules.map((schedule: any) => (
              <SelectItem key={schedule.id} value={JSON.stringify(schedule)}>
                <div className="flex flex-col text-sm gap-1">{schedule.start_at} - {schedule.end_at}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
        {/* deliver date  */}
      <RadioGroup
            dir="rtl"
            value={watch("delivery_date")} // Controlled value
            onValueChange={(value) => {
                console.log("New value selected:", value); // Debugging
                setValue("delivery_date", value); // Update the value
            }}
            className="grid grid-cols-3"
        >
            {availableDates.map((date) => (
                <div key={(date as any)?.date} className="flex items-center gap-2">
                    <RadioGroupItem value={(date as any)?.date} id={(date as any)?.date} />
                    <Label
                        htmlFor={(date as any)?.date}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {(date as any)?.date}
                    </Label>
                </div>
            ))}
        </RadioGroup>
        <button type='submit'>add</button>

    </form>
  );
};

export default CheckoutForm;
