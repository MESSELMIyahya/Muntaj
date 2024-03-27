import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiStar } from "react-icons/hi";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProduct } from "@/lib/products";
import RatingStar from "@/components/RatingStars";

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
    <div className="mt-12 md:mt-16 max-w-6xl m-auto space-y-10 px-4 pb-8">
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
            category={product.category}
            description={product.description}
          />
        </CardContent>
      </Card>

      <Card className="grid grid-cols-1 md:grid-cols-3 p-2 gap-2">
        <Card className="col-span-1 space-y-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold ">التقييم العام</h2>
            <h3 className="text-xl font-semibold">4</h3>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <RatingStar rate={4} />
              <p>بناءً على 8179 تقييمات</p>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <h2 className="text-2xl">اراء المستخدمين</h2>
          </CardHeader>
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
        </Card>
      </Card>
    </div>
  );
}

function ProductContent({
  category,
  description,
}: {
  category: string;
  description: string;
}) {
  return (
    <>
      <Badge>{category}</Badge>
      <h1 className="text-2xl">
        وحدة تحكم بلاي ستيشن 5 (إصدار القرص) مع وحدة التحكم
      </h1>
      <p className="text-lg">{description}</p>
      <div className="flex items-center gap-6">
        <Button className="w-full">تواصل</Button>
        <Button variant="outline" size="icon">
          <HiStar className="size-6 transition-colors text-neutral-300" />
        </Button>
      </div>
    </>
  );
}

function UserComment() {
  return (
    <CardContent className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-xl">محمد عادل</CardTitle>
        <CardDescription>
          المنتج في غاية الروعة, استخدامه سهل وجودة الخامات عالية
        </CardDescription>
      </div>
    </CardContent>
  );
}
