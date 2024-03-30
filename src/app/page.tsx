import CategoriesSection from "@/components/CategoriesPart";
import MainAD from "@/components/MainAd";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import SquareAD from "@/components/SquareAd";
import { categoriesIds, getCategoryIcon, getCategoryNameById } from "@/lib/category";
import {getProducts} from "@/lib/products";


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

      <MainAD  ImageSrc={'/mainAd.jpg'} owner="اعلان  غير رسمي" />
      <div className="w-full hidden md:block  columns-2 gap-5">
        <SquareAD  ImageSrc={'/mainAd.jpg'} owner="اعلان  غير رسمي" />
        <SquareAD  ImageSrc={'/mainAd.jpg'} owner="اعلان  غير رسمي" />
      </div>

    </SectionPart>

    {/* Categories Section */}

    <CategoriesSection items={categories} />

    {/* Products Page */}

    <SectionPart className="justify-center  flex gap-2 flex-wrap">

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
            store={{ name:e.store.name, id: e.store._id ,contact:e.store.contact}}
          />
        )
    }
    
    </SectionPart>

  </PageSection>)
}