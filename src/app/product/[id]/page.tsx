// import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageSection from "@/components/PageSection";
import SectionPart from "@/components/SectionPart";
import { getProduct, getProductsByCategory } from "@/lib/products";
import { notFound } from 'next/navigation'
import ProductCard from "@/components/ProductCard";
import ProductContent from "./_components/ProductContent";
import { Metadata } from "next";


interface PropsType {
  params:{
      id:string;
  }
}

// generating meta data

export async function generateMetadata({params}:PropsType){
  const product = await getProduct(params.id);

  if (!product) {
    throw notFound()
  }

  return { 
    title:"منتج - " + product.name,
    description : product.description ,
    authors:product.store.name,
  } as Metadata
}

export default async function page({params}:PropsType) {
  // need to get product id from url
  const product = await getProduct(params.id);

  if (!product) {
    throw notFound()
  }

  const SProducts = await getProductsByCategory(product.category,3);
  
  return (
    <PageSection>
      <SectionPart>

        <Card className="flex flex-col md:flex-row gap-3">
          <CardHeader className="w-full md:w-[20em]">
            <img
              className="w-full h-full border object-contain rounded-xl"
              src={product.primaryImage}
              width={800}
              height={800}
              loading="lazy"
              alt="product"
            />
          </CardHeader>

          <CardContent className="w-full md:w-auto flex flex-col gap-2 flex-1 py-6">
            <ProductContent
              title={product.name}
              contact={product.store.contact}
              storeName={product.store.name}
              storeImg={product.store.storeImage}
              storeId={product.store._id}
              country={product.country}
              category={product.category}
              description={product.description}
            />
          </CardContent>
        </Card>

      </SectionPart>

      <SectionPart className="pb-4 md:pb-4">
        <Card>
          <CardHeader className="text-2xl font-semibold text-center">
            منتجات ممثلة
          </CardHeader>
        </Card>
      </SectionPart>

      <SectionPart className="justify-center flex gap-2 flex-wrap">
        {
          SProducts && SProducts.map((e) =>
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
            />
          )
        }

      </SectionPart>
    </PageSection>
  );
}


