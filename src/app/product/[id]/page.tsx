import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HiStar } from 'react-icons/hi';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CategoryName from '@/components/CategoryName';
import GetCountryName from '@/lib/country';
import CountryFlag from '@/components/CountryFlag';
import SectionPart from '@/components/SectionPart';
import PageSection from '@/components/PageSection';
import { getProduct } from '@/lib/products';
const imgURL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s';

interface PropsType {
  params: {
    id: string;
  }
}

export default async function ProductPage({ params }: PropsType) {
  const prod = await getProduct(params.id);


  return (
    <PageSection>
      <SectionPart>
        <Card className="flex justify-between gap-3 flex-col md:flex-row">
          <CardHeader className="w-full md:w-2/6 border-b md:border-b-none md:border-l">
            <Image src={prod.primaryImage} width={800} height={800} alt="product" />
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-6 py-3">

            <div className="w-full flex items-center gap-2">
              <Badge className="flex items-center gap-1 rounded-sm text-sm ">
                <CategoryName ID={prod.category} />
              </Badge>

              <Badge variant="outline" className="flex text-sm items-center gap-1 rounded-sm">
                {GetCountryName(prod.country)}
                <CountryFlag country={prod.country} className="w-4" />
              </Badge>
            </div>

            <h1 className="w-full text-2xl text-secondary-foreground font-semibold">{prod.name}</h1>
            <p className="w-full flex-1 text-lg">{prod.description}</p>
            <div className="flex items-center gap-4">
              <Button className="flex-1">تواصل</Button>
              <Button variant="outline" size="icon">
                <HiStar className="size-6 transition-colors text-neutral-300" />
              </Button>
            </div>

          </CardContent>
        </Card>
      </SectionPart>

      <SectionPart>
        <Card className="grid grid-cols-1 md:grid-cols-3 p-2 gap-2">
          <Card className="col-span-1 space-y-2">
            <CardHeader>
              <h2 className="text-2xl font-semibold">التقييم العام</h2>
              <h3 className="text-xl font-semibold">{prod.rating}</h3>
            </CardHeader>
            <CardContent>
              <div>
                <RatingStar />
                <p>بناءً على 8179 تقييمات</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full md:col-span-2">
            <CardHeader>
              <h2 className="text-2xl">اراء المستخدمين</h2>
            </CardHeader>
            <UserComment />
            <UserComment />
            <UserComment />
            <UserComment />
          </Card>
        </Card>
      </SectionPart>
    </PageSection>);
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

function RatingStar() {
  return (
    <div className="flex items-center gap-1">
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-neutral-300" />
    </div>
  );
}
