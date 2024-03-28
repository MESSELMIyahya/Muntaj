import useAuth from "@/auth/hooks/useAuth"
import AxiosReq from "@/lib/axios"
import { ProductType, StoreType } from "@/types/types"
import { useEffect, useState } from "react"


interface ReturnedType {
    isLoading:boolean,
    products:ProductType[]|null;
    store:StoreType|null;
    error:string|null;
    refetch:()=>Promise<void>;
}

type useStoreType = ()=> ReturnedType 

const useDashboard : useStoreType = ()=>{
    const [isLoading,setIsLoading] = useState(false);
    const [ store,setStore ] = useState<StoreType|null>(null);
    const [ products,setProducts ] = useState<ProductType[]|null>(null);
    const [error,setError] = useState<null|string>(null);

    async function FetchData (){
        setIsLoading(true);
        try{
            // fetch the store 
            const resStore = await AxiosReq.get('api/v1/user/store')
            if(resStore.data.data){
                setStore(resStore.data.data)
            }

            // fetch the products 
            const resProducts = await AxiosReq.get('api/v1/user/product')
            if(resProducts.data.data){
                setProducts(resProducts.data.data)
            }

        }catch(err){
            setError('something went wrong');
            console.log(err);
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        FetchData();
    },[])

    return {isLoading,error,products,store,refetch:FetchData}
}



export default useDashboard ;