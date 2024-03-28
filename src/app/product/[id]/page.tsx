import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiStar } from "react-icons/hi";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageSection from "@/components/PageSection";
import SectionPart from "@/components/SectionPart";
import CategoryName from "@/components/CategoryName";
import GetCountryName from "@/lib/country";
import CountryFlag from "@/components/CountryFlag";
import getProducts, { getProduct } from "@/lib/products";
import getStore from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default async function page() {
  const products = await getProducts();
  // need to get product id from url
  const product = await getProduct("ss");
  const store = await getStore("dd");

  if (!product) {
    return (
      <div>
        <h1>Loading......</h1>
      </div>
    );
  }

  return (
    <PageSection>
      <SectionPart>
        <Card className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <CardHeader className="col-span-1">
            <Image
              className="m-auto md:m-0 max-w-80 md:max-w-full"
              src={product.primaryImage}
              width={800}
              height={800}
              alt="product"
            />
          </CardHeader>

          <CardContent className="col-span-2 space-y-4 mt-4">
            <ProductContent
              country={product.country}
              category={product.category}
              description={product.description}
            />
          </CardContent>
        </Card>
      </SectionPart>

      <SectionPart>
        <Card>
          <CardHeader className="text-2xl font-semibold">عن البائع</CardHeader>
          <CardContent className="flex gap-8 ">
            <div className="w-[75px] md:w-[100px]">
              <Image
                src={store.storeImage}
                width={500}
                height={500}
                alt="store profile"
                className="rounded-full overflow-hidden aspect-square"
              />
            </div>
            {/* </div> */}

            <div className="col-spans-4">
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p>{store.description}</p>
            </div>
          </CardContent>
        </Card>
      </SectionPart>
      <SectionPart>
        <Card>
          <CardHeader className="text-2xl font-semibold text-center">
            منتجات ممثلة
          </CardHeader>
          <CardContent className="flex gap-4 flex-col md:flex-row">
            {products &&
              products.map((e) => (
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
                  store={{ name: e.store.name, id: e._id }}
                />
              ))}
          </CardContent>
        </Card>
      </SectionPart>
    </PageSection>
  );
}

function ProductContent({
  category,
  description,
  country,
}: {
  country: string;
  category: string;
  description: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Badge className="flex items-center gap-1 rounded-sm text-md ">
          <CategoryName ID={category} />
        </Badge>

        <Badge
          variant="outline"
          className="flex text-md items-center gap-1 rounded-sm"
        >
          {GetCountryName(country)}
          <CountryFlag country={country} className="w-5" />
        </Badge>
      </div>
      <h1 className="text-2xl">
        وحدة تحكم بلاي ستيشن 5 (إصدار القرص) مع وحدة التحكم
      </h1>
      <p className="text-lg">{description}</p>
      <div className="flex items-center gap-6">
        <Button className="flex-1">تواصل</Button>
        <Button variant="outline" size="icon">
          <HiStar className="size-6 transition-colors text-neutral-300" />
        </Button>
      </div>
    </>
  );
}
