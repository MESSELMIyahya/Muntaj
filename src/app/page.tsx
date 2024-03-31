import CategoriesSection from "@/components/CategoriesPart";
import MainAD from "@/components/MainAd";
import PageSection from "@/components/PageSection";
import SectionPart from "@/components/SectionPart";
import SquareAD from "@/components/SquareAd";
import { categoriesIds, getCategoryIcon, getCategoryNameById } from "@/lib/category";
import HomePageProductsSection from "./_components/HomePageProductsSection";


export default async function HomePage() {
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

    <HomePageProductsSection/>
    
    </SectionPart>

  </PageSection>)
}