'use client';
import React, { useEffect, useState } from "react";
// next-auth 
import { useSession } from "next-auth/react";
// next-navigation 
import { useRouter } from "next/navigation";
// form 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// components 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CirclesLoader from "@/components/loader/circles-loader";
// api calls 
import { getCheckout } from "@/api-calls/checkout/checkout";
import { getUserAddress } from "@/api-calls/user/getUserAddresses";
import { getPaymentMethods } from "@/api-calls/getPaymentMethods";
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
// utils 
import { fireAlert } from "@/lib/fireAlert";
import PinLocation from "@/app/(app)/profile/components/pin-location";


const schema = z.object({
  details: z.string(),
  address_details: z.string(),
  address_location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  driver_tip: z.number().min(0),
  schedule_id: z.string().nullable(),
  delivery_date: z.string(),
  payment_method: z.any(),
});

type FormValues = z.infer<typeof schema>;

const UserDataForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      schedule_id: null,
      address_details: "",
      details: "",
      payment_method: null,
      address_location: {
        type: "Point",
        coordinates: [0, 0],
      },
      driver_tip: 0,
      delivery_date: "",
    },
  });

  const { handleSubmit, setValue, watch, getValues, formState:{errors} } = form;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [checkoutResponse, addressesResponse, methodsResponse] = await Promise.all([
          getCheckout(),
          getUserAddress(),
          getPaymentMethods()
        ]);
        setCheckoutData(checkoutResponse);
        setAddresses(addressesResponse?.data ?? []);
        setPaymentMethods(methodsResponse?.data ?? []);
        setIsLoading(false);
      } catch (error) {
        fireAlert("Error fetching data", "error");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    try {
      const baseUrl = await getBaseUrl();
      const formattedData:any = {
        ...values,
        schedule: { id: values?.schedule_id ? JSON.parse(values?.schedule_id ?? "{}").id : undefined },
        payment_method: { id: values.payment_method?.id }
      };

      delete formattedData.schedule_id;

      const response = await fetch(`${baseUrl}/cart`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      
      if (data?.id) {
        try{
          
          const response = await fetch(`${baseUrl}/cart/checkout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              customer_phone:session?.user?.phone,
              customer_name:session?.user?.name,
            })
          });
          const data = await response.json();
          if(data.id){

            fireAlert("تم استلام طلبك بنجاح", "success");
            router.push("/");
            return;
          }
          throw data;
        }catch(error){
          fireAlert("حدث خطأ", "error");
        }
      }
      
      throw data;
    } catch (error) {
      fireAlert((error as any)?.message, "error");
    }
  };

  if (isLoading) {
    return <CirclesLoader />;
  }

  return (
    <div>
      <div className="container px-4 py-8">
      <form className="flex gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-4">
          <FormSection title="العنوان">
            <Select
              dir="rtl"
              value={selectedAddress}
              onValueChange={(value) => {
                setSelectedAddress(value);
                const currentAddress = addresses.find((i: any) => i.id === value);
                setValue("address_details", (currentAddress as any)?.details ?? "");
                setValue("address_location", (currentAddress as any)?.location ?? "");
              }}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="العنوان" />
              </SelectTrigger>
              <SelectContent>
                {addresses?.map((address: any) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormSection>

          <FormSection title="طريقة الدفع">
            <Select
              dir="rtl"
              value={watch("payment_method") ? JSON.stringify(watch("payment_method")) : undefined}
              onValueChange={(value) => {
                setValue("payment_method", value ? JSON.parse(value) : null);
              }}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods?.map((method: any) => (
                  <SelectItem key={method.id} value={JSON.stringify(method)}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormSection>

          <FormSection title="الموعد">
            <Select
              dir="rtl"
              value={watch("schedule_id") ?? undefined}
              onValueChange={(value) => {
                setValue("schedule_id", value);
                const dates = JSON.parse(value).available_dates || [];
                setAvailableDates(dates);
                setValue("delivery_date", dates[0]?.date);
              }}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="الموعد" />
              </SelectTrigger>
              <SelectContent>
                {(checkoutData as any)?.available_schedules?.map((schedule: any) => (
                  <SelectItem key={schedule.id} value={JSON.stringify(schedule)}>
                    <div className="flex flex-col text-sm gap-1">
                      {schedule.start_at} - {schedule.end_at}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormSection>

          <RadioGroup
            dir="rtl"
            value={watch("delivery_date")}
            onValueChange={(value: string) => setValue("delivery_date", value)}
            className="grid grid-cols-3"
          >
            {availableDates.map((date: any) => (
              <div key={date.date} className="flex items-center gap-2">
                <RadioGroupItem value={date.date} id={date.date} />
                <Label htmlFor={date.date}>{date.date}</Label>
              </div>
            ))}
          </RadioGroup>

          <FormSection title="اكرامية للسائق">
            <Input
              className="!py-6"
              type="number"
              // {...form.register("driver_tip")}
              value={watch("driver_tip")}
              onChange={(e)=>setValue('driver_tip', Number(e.target.value))}
            />
          </FormSection>

          <FormSection title="ملاحظات اضافية">
            <Textarea
              className="py-6"
              {...form.register("details")}
            />
          </FormSection>
        </div>
        <div className="w-full lg:w-96 lg:min-w-96 flex flex-col gap-4">
          <FormSection title="تفاصيل العنوان">
            <Input
              className="py-6"
              type="text"
              // {...form.register("driver_tip")}
              value={watch("address_details")}
              onChange={(e)=>setValue('address_details', e.target.value)}
            />
          </FormSection>
          <PinLocation
            defaultLocation={{
              lat: watch("address_location").coordinates[1] ?? 0,
              lng: watch("address_location").coordinates[0] ?? 0,
            }}
            handlePositionChanging={(lat: number, lng: number) => {
              setValue("address_location", {
                type: "Point",
                coordinates: [lng, lat],
              });
            }}
          />
        </div>
       
      </form>
    </div>
    </div>

  )
}


const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm mb-2">{title}</p>
    {children}
  </div>
);


export default UserDataForm
