import { Banners, Meta } from "@/types/types";
type GetBanners = ()=>Promise<Banners|null>;
export const getBanners:GetBanners = async ()=>{
    try {
        const response = await fetch(`${process.env.BASE_URL}/banners`);
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
        return null
    }

}