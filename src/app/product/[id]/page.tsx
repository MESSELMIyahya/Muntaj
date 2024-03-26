import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HiStar } from 'react-icons/hi';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const imgURL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s';

export default function page() {
  return (
    <div className="mt-16 max-w-7xl m-auto space-y-10">
      <div className="grid gap-8 grid-cols-3">
        <div className="col-span-1 bg-yellow-200">
          <Image src={imgURL} width={800} height={800} alt="product" />
        </div>
        <div className="col-span-2 space-y-4">
          <Badge>الكترونيات</Badge>
          <h1 className="text-2xl">
            وحدة تحكم بلاي ستيشن 5 (إصدار القرص) مع وحدة التحكم
          </h1>
          <p className="text-lg">
            منتج يتميز بسرعة عالية - استغل قوة وحدة المعالجة المركزية المخصصة
            وبطاقة الرسومات ومحرك الأقراص SSD مع وحدات الإدخال والإخراج المدمجة
            التي تعمل على إعادة كتابة القواعد التي يمكن لجهاز الألعاب بلايستيشن
            فعلها. ألعاب مذهلة - استمتع برسومات مذهلة واستمتع بتجربة ميزات PS5
            الجديدة. انغماس مذهل - اكتشف تجربة ألعاب أعمق مع دعم التغذية الراجعة
            اللمسية والمحفزات التكيفية وتقنية الصوت ثلاثية الأبعاد. استمتع بلعب
            سلس ومرن وذي معدل إطارات عالٍ يصل إلى 120 إطار في الثانية للألعاب
            المتوافقة. بفضل تقنية HDR tv،
          </p>
          <div className="flex items-center gap-6">
            <Button className="w-full">تواصل</Button>
            <Button variant="outline" size="icon">
              <HiStar className="size-6 transition-colors text-neutral-300" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-1 space-y-2">
          <h2 className="text-2xl font-semibold">التقييم العام</h2>
          <h3 className="text-xl font-semibold">4</h3>
          <div className="flex gap-1">
            <HiStar className="size-6 transition-colors text-amber-500" />
            <HiStar className="size-6 transition-colors text-amber-500" />
            <HiStar className="size-6 transition-colors text-amber-500" />
            <HiStar className="size-6 transition-colors text-amber-500" />
            <HiStar className="size-6 transition-colors text-neutral-300" />
          </div>
          <p>بناءً على 8179 تقييمات</p>
        </div>

        <div className="space-y-4 col-span-2">
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
        </div>
      </div>
    </div>
  );
}

function UserComment() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl">محمد عادل</h2>
        <p>المنتج في غاية الروعة, استخدامه سهل وجودة الخامات عالية</p>
      </div>
    </div>
  );
}
