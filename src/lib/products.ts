import { ProductType } from "@/types/types";

const testImg =
  "https://m.media-amazon.com/images/I/51-TFGHQE2L._AC_SX569_.jpg";

const testProds: ProductType[] = [
  {
    _id: "f093hf93fh0",
    category: "ct4",
    country: "eg",
    images: [testImg, testImg, testImg, testImg],
    primaryImage: testImg,
    description:
      "دقة حجم الشاشة: 2.08nch 390 * 435-TFT مستوى مقاوم للماء: IP67 APP: WearFit pro متطلبات النظام: android5.0 + / ios10.0 + الشريحة الرئيسية: ذاكرة HS6621-PG: هاتف بلوتوث 128 ميجابايت: AB5376A2 إصدار بلوتوث: 5.2 بطارية السعة: 300mah مكبر الصوت: نعم المحرك: نعم المشفر: نعم مفاتيح الوظائف: نعم وضع واجهة الشحن: كابل الشاحن اللاسلكي الميزة ： هاتف بلوتوث مفتاح متعدد الاتصال Wechat / Alipay وظيفة الدفع التحكم في الوصول إلى NFC فتح وظيفة تحديد المواقع وظيفة الصوت اختبار معدل ضربات القلب الدم الأكسجين وظيفة ضغط الدم قائمة نمط قرص العسل الذكي انقر نقرًا مزدوجًا فوق الشاشة لإيقاظ الوظيفة الطقس لتذكير المكالمات الهاتفية تذكير المستقرة رمز المسح الضوئي للتوصيل مقياس الخطوة المسافة السعرات الحرارية أنماط الحركة رفعت يدي على الشاشة الساطعة مراقبة النوم المنبه للتذكير ساعة توقيت تبحث عن ساعة شاشة عرض ذكية مقسمة شاشة قفل مختلطة تشغيل الموسيقى تدريب التنفس قياس الساعة الآلة الحاسبة تحيط الساعة اختصار رمز الصحة ealth ",
    store: {
      country: "dz",
      _id: "092hf903fh",
      name: "TechDz",
      photo: testImg,
      rating: 5,
    },
    name: "ساعة ذكية واحترافية  مصنعة في مصر",
    videoURL: "",
    rating: 100,
    colors: [],
    comments: [],
  },
];

async function getProducts(n: number = 10): Promise<ProductType[]> {
  return [...testProds, ...testProds, ...testProds];
}

async function getProduct(id: string): Promise<ProductType> {
  return testProds[0];
}

export default getProducts;
export { getProduct };
