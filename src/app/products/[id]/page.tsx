
import CountryFlag from "@/components/CountryFlag";
import PageSection from "@/components/PageSection";
import ProductCard from "@/components/ProductCard";
import SectionPart from "@/components/SectionPart";
import GetCountryName from "@/lib/country";
import getProducts, { getProduct } from "@/lib/products";

interface PropsType {
    params:{
        id:string;
    }
}


export default async function SearchPage ({params}:PropsType){
    const prod = await getProduct(params.id);



    const countryNameArabic = GetCountryName(prod.country); // => you give it country id and it returns the name in arabic

    
    return (<PageSection>

        <SectionPart>
            {countryNameArabic}
            {' '}
            <CountryFlag country={prod.country} className="w-5" />  {/* => you give it the country id and it returns the flag of  it*/}

        </SectionPart>


    
    </PageSection>)
}