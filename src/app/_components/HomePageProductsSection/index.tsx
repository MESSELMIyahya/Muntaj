'use client';

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";
import SectionPart from "@/components/SectionPart";
import { getProductsData } from "@/lib/data";
import { ProductType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";



export default function HomePageProductsSection() {
    const { isLoading , data:products } = useQuery<ProductType[]>({
        queryKey:['homeProducts'],
        staleTime:3 * (60*1000) ,// => 5min
        retry:true, 
        retryDelay:2000,// => 2s
        queryFn:getProductsData,
    });


    return (<>

        {/* Products Page */}

        <SectionPart className="justify-center  flex gap-2 flex-wrap">

            {
                !isLoading  ?  
                products && products.map((e) =>
                    <ProductCard
                        key={e._id}
                        category={e.category}
                        country={e.country}
                        description={e.description}
                        title={e.name}
                        image={e.primaryImage}
                        rated={false}
                        id={e._id}
                        rating={e.rating || 0}
                        store={{ name: e.store.name, id: e.store._id, contact: e.store.contact }}
                    />)
                :
                <>
                  {
                    Array.from({length:9}).map((_,e)=>
                        <ProductCardSkeleton key={e}/>
                    )
                } 
                </>                
            }

        </SectionPart>



    </>);
}