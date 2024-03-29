import { ProductType, StoreType } from "@/types/types";
import AxiosReq from "./axios";


async function getStore(id: string): Promise<{store:StoreType,products:ProductType[]}|null> {
  try{
    const resStore = await AxiosReq.get('/api/v1/store/'+id)
    const resProducts = await AxiosReq.get('/api/v1/product?store='+id)
    return {products:resProducts.data.data,store:resStore.data.data};
  }catch(err){
    console.log(err);
    return null ;
  }
}

export default getStore;
