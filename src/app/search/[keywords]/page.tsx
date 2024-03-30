import LineAD from "@/components/LineAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import { getProductsBySearch } from "@/lib/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params:{
        keywords:string;
    }
}


// generating meta data

export async function generateMetadata({params}:Props){
    const searchText = decodeURIComponent(params.keywords) ;
      
    return { 
      title:"منتج - " + searchText,
      description : 'بحث عن ' + searchText 
    } as Metadata
}



export default async function SearchPage ({params}:Props){
    const searchText = decodeURIComponent(params.keywords) ;

    const prods = await getProductsBySearch(searchText);

    if(!prods){
        throw notFound()
    }
    
    return (<PageSection>

        <SectionPart >
            <h2 className="text-lg md:text-3xl text-primary font-medium line-clamp-1 md:line-clamp-2">{searchText}</h2>
        </SectionPart>
    
        <SectionPart>
            <LineAD ImageSrc={'/lineAd2.jpg'} owner="@Muntaj" />
        </SectionPart>

        <SectionPart className="justify-center flex gap-2 flex-wrap">

        {
        prods && prods.map((e)=>
          <ProductCard
            key={e._id}
            category={e.category}
            country={e.country}
            description={e.description}
            title={e.name}
            image={e.primaryImage}
            rated={false}
            id={e._id}
            rating={e.rating ||  0}
            store={{ name:e.store.name,contact:e.store.contact, id: e._id }}
          />
        )
    }
        
        </SectionPart>        
    
    </PageSection>)
}