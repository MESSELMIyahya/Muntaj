import LineAD from "@/components/LineAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import getProducts from "@/lib/products";

interface PropsType {
    params:{
        keywords:string;
    }
}

const ImageAdURL = 'https://media.ouedkniss.com/medias/images/EZAgm/UMHWDudx17WET5Yitn5p8r8yFaSRz1WMt1BWpEWc.jpg';

export default async function SearchPage ({params}:PropsType){
    const searchText = decodeURIComponent(params.keywords) ;

    const ProductsBySearch = await getProducts();
    
    return (<PageSection>

        <SectionPart >
            <h2 className="text-lg md:text-3xl text-primary font-medium line-clamp-1 md:line-clamp-2">{searchText}</h2>
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