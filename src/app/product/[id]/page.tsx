import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiStar } from "react-icons/hi";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getProduct } from "@/lib/products";
import RatingStar from "@/components/RatingStars";
import UserComment from "@/components/UserComment";
import PageSection from "@/components/PageSection";
import SectionPart from "@/components/SectionPart";
import CategoryName from "@/components/CategoryName";
import GetCountryName from "@/lib/country";
import CountryFlag from "@/components/CountryFlag";

export default async function page() {
  // need to get product id from url
  const product = await getProduct("ss");

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


        <Card className="grid grid-cols-1 md:grid-cols-3 p-2 gap-2">
          <Card className="col-span-1 space-y-2">
            <CardHeader>
              <h2 className="text-2xl font-semibold ">التقييم العام</h2>
              <h3 className="text-xl font-semibold">4</h3>
            </CardHeader>
            <CardContent>
              <div>
                <RatingStar rate={4} />
                <p>بناءً على 8179 تقييمات</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <h2 className="text-2xl">اراء المستخدمين</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserComment />
              <UserComment />
              <UserComment />
              <UserComment />
            </CardContent>
          </Card>
        </Card>

      </SectionPart>

    </PageSection>
  );
}

function ProductContent({
  category,
  description,
  country
}: {
  country:string;
  category: string;
  description: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Badge className="flex items-center gap-1 rounded-sm text-md ">
          <CategoryName ID={category} />
        </Badge>

        <Badge variant="outline" className="flex text-md items-center gap-1 rounded-sm">
          {GetCountryName(country)}
          <CountryFlag country={country} className="w-5"/>
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

