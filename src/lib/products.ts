import { ProductType } from "@/types/types";
import AxiosReq from "./axios";



const IsEven =(n:number)=> n % 3 == 0 ;



async function getProducts() : Promise<ProductType[]|null> {
    try{
      const res = await fetch('/api/v1/product',{cache:"no-store"})
      const prods : ProductType[] = (await res.json()).data; 
      return prods
    }catch(err){
      console.log(err);
      return null ;
    }
}

async function getProductsBySearch(keywords:string) : Promise<ProductType[]|null> {
  try{
    const res = await AxiosReq.get('/api/v1/product?search='+keywords)
    const prods : ProductType[] = res.data.data; 
    return prods
  }catch(err){
    console.log(err);
    return null ;
  }
}

async function getProductsByCategory(id:string,limit:number=50) : Promise<ProductType[]|null> {
  try{
    const res = await AxiosReq.get('/api/v1/product'+'?category='+id+'&limit='+limit);
    const prods : ProductType[] = res.data.data; 
    return prods
  }catch(err){
    console.log(err);
    return null ;
  }
}

async function getProductsLimit(num:number=20) : Promise<ProductType[]|null> {
  try{
    const res = await AxiosReq.get('/api/v1/product'+'?limit='+num);
    return res.data.data;
  }catch(err){
    console.log(err);
    return null ;
  }
}

async function getProduct(id: string): Promise<ProductType|null> {
  try{
    const res = await AxiosReq.get('/api/v1/product/'+id)
    return res.data.data;
  }catch(err){
    console.log(err);
    return null ;
  }
}

export { getProduct,getProductsBySearch , getProductsLimit , getProducts , getProductsByCategory };
