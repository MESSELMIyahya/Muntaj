import CategoriesSection from "@/components/CategoriesPart";
import MainAD from "@/components/MainAd";
import PageSection from "@/components/PageSection";
import SectionPart from "@/components/SectionPart";
import SquareAD from "@/components/SquareAd";
import { LuApple, LuBaby, LuCpu, LuDumbbell, LuHome, LuMonitor, LuRefrigerator, LuShirt, LuStethoscope, LuToyBrick } from 'react-icons/lu'

const ImageAdURL = 'https://media.ouedkniss.com/medias/images/EZAgm/UMHWDudx17WET5Yitn5p8r8yFaSRz1WMt1BWpEWc.jpg';


const CategoriesAll = 
[
  "Computer" // => الكمبيوتر
, "Fashion" // => موضة
, "Food" // => طعام
, "Electronics " // => الالكترونيات
, "Baby & Childcare"  // => رعاية الطفل
, "Household Appliances" // => الأجهزة المنزلية
, "Home & Kitchen" // => المنزل والمطبخ
, "Sport stuff" // => اشياء رياضية
, "Medical" // => طبي
, "Toys" // => ألعاب الأطفال
]


export default function HomePage() {


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


    <CategoriesSection items={[

      {
        Icon:LuMonitor,
        link:'https://google.com',
        title:"الكمبيوتر"
      },
      {
        Icon:LuShirt ,
        link:'https://google.com',
        title:"موضة"
      },
      {
        Icon:LuApple,
        link:'https://google.com',
        title:"طعام"
      },
      {
        Icon:LuCpu,
        link:'https://google.com',
        title:"الالكترونيات"
      },
      {
        Icon:LuBaby,
        link:'https://google.com',
        title:"رعاية الطفل"
      },
      {
        Icon:LuRefrigerator,
        link:'https://google.com',
        title:"الأجهزة المنزلية"
      },
      {
        Icon:LuHome,
        link:'https://google.com',
        title:"المنزل والمطبخ"
      },
      {
        Icon:LuDumbbell,
        link:'https://google.com',
        title:"اشياء رياضية"
      },
      {
        Icon:LuStethoscope ,
        link:'https://google.com',
        title:"طبي"
      },
      {
        Icon:LuToyBrick ,
        link:'https://google.com',
        title:"ألعاب الأطفال"
      }

    ]} />


  </PageSection>)
}