import React from 'react'
import {getCheckout} from "@/api-calls/checkout/checkout";
import ViewLocation from '@/components/view-location/ViewLocation';
import { Separator } from '@/components/ui/separator';
import ConfirmCheckout from './components/confirm-checkout';
import { getMeta } from '@/api-calls/meta';
const ReviewOrder = async () => {
    const checkoutData = await getCheckout();
    const meta = await getMeta();
    return (
    <div className='bg-slate-50 min-h-screen relative'>
      <div className="container px-4 py-8 flex flex-col md:flex-row gap-4">
        <div className='flex-1 flex flex-col gap-4'>
          <Box>
            <ul>
              {checkoutData?.variables?.length &&
                checkoutData?.variables?.map(
                  (
                    variable: { key: string; value: number | string },
                    index: number,
                  ) => (
                    <li
                      key={index}
                      className="py-1 flex justify-between items-center"
                    >
                      <span className="text-slate-600">{variable.key}</span>
                      <span
                        className={`font-bold ${variable.value === 0 ? "text-green-600" : "text-slate-950"}`}
                      >
                        {variable.value === 0 ? "مجاني" : variable.value}
                      </span>
                    </li>
                  ),
                )}
              <Separator className="w-full h-[1px] bg-slate-300" />
              <li className="py-2 flex justify-between items-center">
                <span className="text-slate-950 text-2xl">الاجمالي</span>
                <span className="text-slate-950 font-bold text-2xl">
                  {checkoutData.total_order_cost}
                </span>
              </li>
            </ul>
          </Box>
         
          <Box>
            <div className='flex justify-between'>
              <span className="text-slate-600">سعر التوصيل الاساسي</span>
              <span className='font-bold text-slate-950'>{checkoutData?.settings?.base_delivery_cost || 0}</span>
            </div>
            <div className='flex justify-between'>
              <span className="text-slate-600">وقت التوصيل</span>
              <span className='font-bold text-slate-950'>{checkoutData?.settings?.order_delivery_time || 0}</span>
            </div>
            <div className='flex justify-between'>
              <span className="text-slate-600">سعر التوصيل للكيلو متر</span>
              <span className='font-bold text-slate-950'>{checkoutData?.settings?.price_per_km || 0}</span>
            </div>
          </Box>
        </div>
        <div className='flex-1 flex flex-col gap-4'>
          <Box>
            <div className='flex justify-between'>
              <span className="text-slate-600">المسافة بالكيلو متر</span>
              <span className='font-bold text-slate-950'>{checkoutData?.distance_in_km?.toFixed(2) || 0}</span>
            </div>
            <div className='flex justify-between'>
              <span className="text-slate-600">سعر التوصيل الاساسي</span>
              <span className='font-bold text-slate-950'>{checkoutData?.original_delivery_cost?.toFixed(2) || 0}</span>
            </div>
            <div className='flex justify-between'>
              <span className="text-slate-600">اكرامية السائق</span>
              <span className='font-bold text-slate-950'>{checkoutData?.driver_tip?.toFixed(2) || 0}</span>
            </div>
          </Box>

          <Box>
            <div className='flex justify-between'>
              <span className="text-slate-600">تفاصيل العنوان</span>
              <span className='font-bold'>{checkoutData?.address_details || "لا يوجد"}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className="text-slate-600">العنوان</span>
              <ViewLocation lat={checkoutData?.address_location?.coordinates?.[1]} lng={checkoutData?.address_location?.coordinates?.[0]} />
            </div>
          </Box>
        </div>
      </div>
      <ConfirmCheckout primaryColor={meta?.vendor?.color_primary}/>
    </div>
  )
}

export default ReviewOrder

const Box = ({children}:{children:React.ReactNode})=>{
    return (
        <div className='bg-white rounded-md shadow-sm p-4 flex flex-col gap-2'>
            {children}
        </div>
    )
}