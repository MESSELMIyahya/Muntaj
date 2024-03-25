import CategoriesSection from "@/components/CategoriesPart";
import MainAD from "@/components/MainAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import SquareAD from "@/components/SquareAd";
import { categoriesIds, getCategoryIcon, getCategoryNameById } from "@/lib/category";
import getProducts from "@/lib/products";


const ImageAdURL = 'https://media.ouedkniss.com/medias/images/EZAgm/UMHWDudx17WET5Yitn5p8r8yFaSRz1WMt1BWpEWc.jpg';


export default async function HomePage() {
  const products = await getProducts();

  const categories = categoriesIds.map(e=>({ 
    Icon:getCategoryIcon(e),
    title:getCategoryNameById(e),
    link:`/category/${e}`
   }))

  return (<PageSection className="">

    {/* ADs section */}
    <SectionPart className="w-full flex  flex-col gap-5 ">

      <MainAD ImageSrc={ImageAdURL} owner="Yahya" />
      <div className="w-full hidden md:block  columns-2 gap-5">
        <SquareAD ImageSrc={ImageAdURL} owner="Yahya" />
        <SquareAD ImageSrc={ImageAdURL} owner="Yahya" />
      </div>
      {/* <LineAD ImageSrc={ImageAdURL} owner="Yahya" /> */}

    </SectionPart>

    {/* Categories Section */}

    <CategoriesSection items={categories} />

    {/* Products Page */}

    <SectionPart className="columns-1 md:columns-2 lg:columns-3 ">

    {
        products && products.map((e)=>
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