


import CategoryItem from "@/components/CategoryItem";
import LineAD from "@/components/LineAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import { doesCategoryExists, getCategoryIcon, getCategoryNameById } from "@/lib/category";
import getProducts from "@/lib/products";
import { redirect } from "next/navigation";

interface PropsType {
    params:{
        id:string;
    }
}

const ImageAdURL = 'https://media.ouedkniss.com/medias/images/EZAgm/UMHWDudx17WET5Yitn5p8r8yFaSRz1WMt1BWpEWc.jpg';

export default async function SearchPage ({params}:PropsType){
    const id = decodeURIComponent(params.id) ;

    const isValidCategory = doesCategoryExists(id);

    if(!isValidCategory){
        redirect('/')
    }
    
    const ProductsBySearch = await getProducts();


    const CategoryIcon = getCategoryIcon(id);
    const CategoryTitle = getCategoryNameById(id);


    return (<PageSection>

        <SectionPart >
            <div className="flex items-center gap-3">
                <CategoryItem size="sm" Icon={CategoryIcon}/>
                <h2 className="text-lg md:text-3xl font-medium text-secondary-foreground ">{CategoryTitle}</h2>
            </div>            
        </SectionPart>
    
        <SectionPart>
            <LineAD ImageSrc={ImageAdURL} owner="Yahya" />
        </SectionPart>

        <SectionPart className="columns-1 md:columns-2 lg:columns-3">

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
            store={{ name:e.store.name, id: e._id }}
          />
        )
    }
        
        </SectionPart>        
    
    </PageSection>)
}