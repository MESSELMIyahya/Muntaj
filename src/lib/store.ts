import { StoreType } from "@/types/types";

const testImg = "https://github.com/shadcn.png";
const ImageAdURL =
  "https://media.ouedkniss.com/medias/images/EZAgm/UMHWDudx17WET5Yitn5p8r8yFaSRz1WMt1BWpEWc.jpg";

const testStore: StoreType[] = [
  {
    _id: "5455sfd5ss",
    name: "TechDz",
    description:
      "قة حجم الشاشة: 2.08nch 390 * 435-TFT مستوى مقاوم للماء: IP67 APP: WearFit pro متطلبات النظام: android5.0 + / ios10.0 + الشريحة الرئيسية: ذاكرة HS6621-PG: هاتف بلوتوث 128 ميجابايت",
    storeImage: testImg,
    storeCoverImage: ImageAdURL,
    rating: 5,
    location: {
      country: "Egypt",
      address: "Arish",
    },
    owner: {
      _id: "5d4w2dw8c1",
      profileImage: testImg,
      userName: "Mohamed Adel",
    },
    contact: {
      phoneNumbers: ["24756982155", "4548484368"],
      email: "ma7598101@gmail.com",
      website: "ddd",
      socialMedia: {
        facebook: "dd",
        instagram: "dd",
        linkedIn: "dd",
        twitter: "dd",
        youtube: "dd",
      },
    },

    productsIDs: ["11111", "222222", "333333", "444444"],
  },
];

async function getStore(id: string): Promise<StoreType> {
  return testStore[0];
}

export default getStore;
