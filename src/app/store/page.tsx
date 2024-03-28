import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import getStore from "@/lib/store";
import Image from "next/image";
import getProducts from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import {
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
// import UserComment from "@/components/UserComment";

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

      <div className="grid md:grid-cols-4 gap-8 pt-8">
        <Card className="col-span-2">
          <CardHeader className="text-3xl font-semibold">
            {store.name}
          </CardHeader>
          <CardContent>
            <CardDescription>{store.description}</CardDescription>
          </CardContent>
        </Card>

        <Card className="col-span-2 flex flex-col px-3 py-3">
          <table>
            <tr className="border">
              <th className="text-lg font-semibold text-start px-1">
                رقم الهاتف
              </th>
              <td>{store.contact.phoneNumbers[0]}</td>
            </tr>
            <tr className="border">
              <th className="text-lg font-semibold text-start px-1">
                البريد الالكتروني
              </th>
              <td>{store.contact.email}</td>
            </tr>
            <tr className="border">
              <th className="text-lg font-semibold text-start px-1">
                الموقع الالكتروني
              </th>
              <td>{store.contact.website}</td>
            </tr>
          </table>
          <div className="flex gap-4 items-center justify-center mt-4">
            <Button>
              <LuFacebook size={25} />
            </Button>
            <Button>
              <LuLinkedin size={25} />
            </Button>
            <Button>
              <LuInstagram size={25} />
            </Button>
            <Button>
              <LuTwitter size={25} />
            </Button>
            <Button>
              <LuYoutube size={25} />
            </Button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-2xl font-semibold text-center">
          المنتجات
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
    </div>
  );
}
