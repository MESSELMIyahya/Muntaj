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
const imgURL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s';

export default function page() {
  return (
    <div className="mt-16 max-w-6xl m-auto space-y-10">
      <Card className="grid gap-8 grid-cols-3">
        <CardHeader className="col-span-1 bg-yellow-200">
          <Image src={imgURL} width={800} height={800} alt="product" />
        </CardHeader>

        <CardContent className="col-span-2 space-y-4 mt-4">
          <ProductContent />
        </CardContent>
      </Card>

      <Card className="grid grid-cols-3 p-2 gap-2">
        <Card className="col-span-1 space-y-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold">التقييم العام</h2>
            <h3 className="text-xl font-semibold">4</h3>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <RatingStar />
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

function ProductContent() {
  return (
    <>
      <Badge>الكترونيات</Badge>
      <h1 className="text-2xl">
        وحدة تحكم بلاي ستيشن 5 (إصدار القرص) مع وحدة التحكم
      </h1>
      <p className="text-lg">
        منتج يتميز بسرعة عالية - استغل قوة وحدة المعالجة المركزية المخصصة وبطاقة
        الرسومات ومحرك الأقراص SSD مع وحدات الإدخال والإخراج المدمجة التي تعمل
        على إعادة كتابة القواعد التي يمكن لجهاز الألعاب بلايستيشن فعلها. ألعاب
        مذهلة - استمتع برسومات مذهلة واستمتع بتجربة ميزات PS5 الجديدة. انغماس
        مذهل - اكتشف تجربة ألعاب أعمق مع دعم التغذية الراجعة اللمسية والمحفزات
        التكيفية وتقنية الصوت ثلاثية الأبعاد. استمتع بلعب سلس ومرن وذي معدل
        إطارات عالٍ يصل إلى 120 إطار في الثانية للألعاب المتوافقة. بفضل تقنية
        HDR tv،
      </p>
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

function RatingStar() {
  return (
    <div className="flex gap-1">
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-amber-500" />
      <HiStar className="size-6 transition-colors text-neutral-300" />
    </div>
  );
}
