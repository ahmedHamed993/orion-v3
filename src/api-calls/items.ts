import { Items } from "@/types/types";

type GetItems = (page:number,paginate:number)=>Promise<Items|null>;
export const getItems:GetItems = async (page, paginate) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/items?page=${page}&paginate=${paginate}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
        return null
    }
}

export const getItemsWithFilters = async (filters:Record<string,string|number>):Promise<Items|null> => {
    let endpoint = `${process.env.BASE_URL}/items?`;
    for(let i in filters){
        endpoint+=`${i}=${filters[i]}&`
    }
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
        return null
    }
}