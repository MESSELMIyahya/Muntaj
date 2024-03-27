import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getStore from "@/lib/store";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import getProducts from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function page() {
  const products = await getProducts();
  const store = await getStore("dd");

  return (
    <div className="mt-12 md:mt-16 max-w-6xl m-auto px-2 space-y-8">
      <Card className="relative">
        <Image
          src={store.storeCoverImage}
          width={1600}
          height={1200}
          alt="store cover"
          className="rounded-sm"
        />
        <div className="absolute -bottom-10 md:-bottom-16 right-6 md:right-12 rounded-full aspect-square border-4 md:border-8 border-white overflow-hidden">
          <Image
            src={store.storeImage}
            width={500}
            height={500}
            alt="store profile"
            className="w-[100px] md:w-[150px]"
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-4 md:grid-rows-2 gap-8 pt-8">
        <Card className="col-span-1 flex flex-col justify-center items-center">
          <CardHeader className="text-2xl font-semibold">
            تقييم المتجر
          </CardHeader>
          <CardContent className="flex gap-4">
            <CardTitle>5</CardTitle>
            <CardDescription>
              <RatingStar rate={5} />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="col-span-1 flex flex-col justify-center items-center">
          <CardHeader className="text-2xl font-semibold">
            تقييم العملاء
          </CardHeader>
          <CardContent className="flex gap-4">
            <CardTitle>4</CardTitle>
            <CardDescription>
              <RatingStar rate={4} />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="col-span-2 row-span-2">
          <CardHeader className="text-2xl font-semibold">
            اراء العملاء
          </CardHeader>
          <CardContent>
            <UserComment />
            <UserComment />
            <UserComment />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="text-2xl font-semibold">حول المتجر</CardHeader>
          <CardContent>
            <CardTitle>{store.name}</CardTitle>
            <CardDescription>{store.description}</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-2xl font-semibold text-center">
          المنتجات
        </CardHeader>
        <CardContent className="flex gap-4">
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
    </div>
  );
}

function RatingStar({ rate }: { rate: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <HiStar
          key={index}
          className={`size-6 transition-colors ${
            rate > index ? "text-amber-500" : "text-neutral-300"
          }`}
        />
      ))}
    </div>
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
