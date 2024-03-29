import CategoryItem from "@/components/CategoryItem";
import LineAD from "@/components/LineAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import { doesCategoryExists, getCategoryIcon, getCategoryNameById } from "@/lib/category";
import {getProductsByCategory} from "@/lib/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PropsType {
    params:{
        id:string;
    }
}

// generating meta data

export async function generateMetadata({params}:PropsType){
    const id = decodeURIComponent(params.id) ;

    const isValidCategory = doesCategoryExists(id);

    if(!isValidCategory){
        throw notFound()
    }

    const CategoryTitle = getCategoryNameById(id);
  
    return { 
      title:"منتج - " + CategoryTitle,
      description : 'منتجات  في ' + CategoryTitle
    } as Metadata
  }


export default async function SearchPage ({params}:PropsType){
    const id = decodeURIComponent(params.id) ;

    const isValidCategory = doesCategoryExists(id);

    if(!isValidCategory){
        throw notFound()
    }
    
    const ProductsBySearch = await getProductsByCategory(id);

    if(!ProductsBySearch){
        throw notFound()
    }


    const CategoryIcon = getCategoryIcon(id);
    const CategoryTitle = getCategoryNameById(id);


    return (<PageSection>

        <SectionPart>
            <div className="flex items-center gap-3">
                <CategoryItem size="sm" Icon={CategoryIcon}/>
                <h2 className="text-lg md:text-3xl font-medium text-secondary-foreground ">{CategoryTitle}</h2>
            </div>            
        </SectionPart>
    
        <SectionPart>
            <LineAD ImageSrc={'/lineAd2.jpg'} owner="@Muntaj" />
        </SectionPart>

        <SectionPart className="justify-center flex gap-2 flex-wrap">
        {
        ProductsBySearch && ProductsBySearch.map((e)=>
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
            store={{ name:e.store.name, contact:e.store.contact, id: e.store._id }}
          />
        )
    }
        
        </SectionPart>        
    
    </PageSection>)
}