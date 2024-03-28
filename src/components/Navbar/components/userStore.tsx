import useAlert from "@/auth/hooks/useAlert";
import useAuth from "@/auth/hooks/useAuth";
import CountryFlag from "@/components/CountryFlag";
import LoadingIcon from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useUser from "@/hooks/useUser";
import AxiosReq from "@/lib/axios";
import GetCountryName, { ArabCountries } from "@/lib/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const phoneRegex = new RegExp(
  /(?:[0-9] ?){6,14}[0-9]$/
);

const createStoreSchema = z.object({
  name: z
    .string()
    .min(2, "يجب ان يكون اسم المتجر اكثر من حرف")
    .max(16, "يجب ان يكون اسم المتجر  اقل  من 16 حرف"),
  address: z
    .string()
    .min(8, "يجب ان يكون العنوان اكثر من 8 احرف")
    .max(32, "يجب ان يكون العنوان اقل من 32 حرف"),
  description: z.string().min(50, "يجب ان يكون الوصف اكثر من 50 حرف"),
  email: z.string().email("الحساب ليس صحيح"),
  phoneNumber1: z.string().regex(phoneRegex, "رقم الهاتف ليس صحيح"),
  phoneNumber2: z.union([z.string().regex(phoneRegex, "رقم الهاتف ليس صحيح").nullish(), z.literal('')]),
  website: z.union([z.string().url("رابط الموقع ليس صحيح").nullish(), z.literal("")]),
  facebook: z.union([z.string().url("رابط الموقع ليس صحيح").nullish(), z.literal("")]),
  instagram: z.union([z.string().url("رابط الموقع ليس صحيح").nullish(), z.literal("")]),
  linkedIn: z.union([z.string().url("رابط الموقع ليس صحيح").nullish(), z.literal("")]),
  youtube: z.union([z.string().url("رابط الموقع ليس صحيح").nullish(), z.literal("")]),
});

type CreateStoreType = z.infer<typeof createStoreSchema>;

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserCreateStoreDialog({ setToggle, toggle }: Props) {
  const { updateData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  // form stuff
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreType>({
    resolver: zodResolver(createStoreSchema),
    // defaultValues,
  });
  const [country, setCountry] = useState("");
  const [countryErr, setCountryErr] = useState(false);
  
  // Alert
  const { alertMe } = useAlert()
  // Image stuff
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageURL, setCoverImageUrl] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageURL, setProfileImageUrl] = useState("");
  const [imageErr, setImageErr] = useState("");

  // handle uploading images
  function updateLoadImage(role: "cover" | "profile", files: File[] | null) {
    setImageErr("");
    if (!files || !files[0]) return;

    const file = files[0];
    if (role == "cover" && file.size > 4_097_152) {
      setImageErr("يجب ان يكون حجم صورة الغلاف اقل من 4MB");
      return;
    } else if (role == "profile" && file.size > 2_097_152) {
      setImageErr("يجب ان يكون حجم صورة المتجر اقل من 2MB");
      return;
    }

    if (role == "cover") {
      const url = URL.createObjectURL(file);
      setCoverImageUrl(url);
      setCoverImageFile(file);
    } else if (role == "profile") {
      const url = URL.createObjectURL(file);
      setProfileImageUrl(url);
      setProfileImageFile(file);
    }
  }

  const handleCreateStore: SubmitHandler<CreateStoreType> = async (data) => {
    setCountryErr(false);
    setUploadErr('');

    // check images
    if (!profileImageFile || !coverImageFile) {
      setImageErr("قم باضافة جميع الصور المطلوبة للمتجر");
      return;
    }

    // check country
    if (!country) {
      setCountryErr(true);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('storeImage', profileImageFile);
    formData.append('storeCoverImage', coverImageFile);
    formData.append('contact[phoneNumbers][0]', data.phoneNumber1); // Convert array to JSON string
    formData.append('contact[email]', data.email);
    formData.append('location[country]', country);
    formData.append('location[address]', data.address);

    // Add optional fields
    if (data.phoneNumber2) formData.append('contact[phoneNumbers][1]', data.phoneNumber2); // Convert array to JSON string
    if (data.website) formData.append('contact[website]', data.website);
    if (data.facebook) formData.append('contact[socialMedia][facebook]', data.facebook);
    if (data.instagram) formData.append('contact[socialMedia][instagram]', data.instagram);
    if (data.linkedIn) formData.append('contact[socialMedia][linkedIn]', data.linkedIn);
    if (data.youtube) formData.append('contact[socialMedia][youtube]', data.youtube);

    try {

      await AxiosReq.post('api/v1/user/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alertMe({
        title:'تم إنشاء متجرك بنجاح 🎉',
        des:'الان قم بانشاء منتجاتك وعرضها للمستثمرين'
      })
      reset();
      setProfileImageFile(null);
      setCoverImageFile(null)
      setCoverImageUrl('')
      setCountry('');
      setProfileImageUrl('')
      setToggle(false);
      updateData({});
    } catch (err) {
      setUploadErr('حدث شيئ غير متوقع حاول مرة اخر')
      console.log(err);
    }

    setIsLoading(false)
  };

  return (
    <Dialog open={toggle} onOpenChange={setToggle}>
      <DialogContent className="sm:max-w-full md:w-[45em]">
        <DialogHeader>
          <DialogTitle>إنشاء متجر</DialogTitle>
          <DialogDescription>
            قم بانشاء متجرك الخاص وعرض منتجاتك المحلية للمستثمرين
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateStore)}>
          <div className="w-full h-[20em] p-4 overflow-y-auto">
            <div className="w-full mb-[5em]">
              <label
                style={{ backgroundImage: `url('${coverImageURL}')` }}
                htmlFor="coverImg"
                className="w-full flex h-[8em] md:h-[10em] cursor-pointer select-none justify-center items-center border-dashed rounded-xl bg-center bg-cover bg-no-repeat border-2 bg-primary/30 hover:opacity-90 transition-opacity border-primary/50 "
              >
                {!coverImageFile ? (
                  <span className="text-sm font-medium text-primary/50">
                    إضافة صورة لخلفية المتجر
                  </span>
                ) : null}
              </label>

              <input
                onChange={(e) => {
                  updateLoadImage("cover", e.target.files as File[] | null);
                  e.target.files = null;
                }}
                id="coverImg"
                type="file"
                disabled={isLoading}
                accept="image/png, image/jpeg , image/jpg"
                className="hidden"
              />
              <input
                onChange={(e) => {
                  updateLoadImage("profile", e.target.files as File[] | null);
                  e.target.files = null;
                }}
                id="profileImg"
                type="file"
                disabled={isLoading}
                accept="image/png, image/jpeg , image/jpg"
                className="hidden"
              />

              <div className="w-full h-0 bg-red-200 flex items-center px-4 -mt-2">
                <div className="size-fit p-2 bg-card rounded-full z-10">
                  <label
                    style={{ backgroundImage: `url('${profileImageURL}')` }}
                    htmlFor="profileImg"
                    className="w-[8em] h-[8em] flex cursor-pointer select-none justify-center items-center border-dashed rounded-full bg-center bg-cover bg-no-repeat border-2 bg-primary/30 hover:opacity-90 transition-opacity border-primary/50 "
                  >
                    {!profileImageFile ? (
                      <span className="text-xs font-medium text-primary/50">
                        إضافة صورة
                      </span>
                    ) : null}
                  </label>
                </div>
              </div>
            </div>
            {imageErr ? (
              <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">
                {imageErr}
              </div>
            ) : null}

            <div className="w-full">
              <h5 className="text-lg font-medium text-accent-foreground mb-4">
                معلومات المتجر
              </h5>

              <div className="flex items-end justify-between gap-6">
                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="name"
                  >
                    اسم المتجر
                  </Label>
                  <Input
                    {...register("name", { required: true })}
                    id="name"
                    disabled={isLoading}
                    className="w-full"
                    placeholder={"اسم متجرك"}
                  />

                  {errors.name ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.name?.message}
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <div className="w-full">
                    <Select disabled={isLoading} onValueChange={(v) => setCountry(v)}>
                      <SelectTrigger dir="rtl" className="w-full">
                        <SelectValue placeholder="البلد" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        {
                          ArabCountries.map(e =>
                            <SelectItem key={e} value={e}>
                              <div className="flex items-center gap-2">
                                <CountryFlag country={e} className="w-4" />
                                {GetCountryName(e)}
                              </div>
                            </SelectItem>
                          )
                        }
                      </SelectContent>
                    </Select>
                  </div>

                  {countryErr ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      اختر بلدك
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mb-4">
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="description"
                >
                  وصف المتجر
                </Label>
                <Textarea
                  {...register("description", { required: true })}
                  id="description"
                  disabled={isLoading}
                  className="w-full h-[6em] resize-none"
                  placeholder={"وصف المتجرك"}
                />
              </div>
              {errors.description ? (
                <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">
                  {errors.description?.message}
                </div>
              ) : null}

              <div className="w-full flex flex-col gap-2 mb-4">
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="address"
                >
                  عنوان المتجر
                </Label>
                <Input
                  {...register("address", { required: true })}
                  id="address"
                  disabled={isLoading}
                  className="w-full"
                  placeholder={"عنوان متجرك"}
                />
              </div>
              {errors.address ? (
                <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">
                  {errors.address?.message}
                </div>
              ) : null}

              <h5 className="text-lg font-medium text-accent-foreground mb-4">
                معلومات التواصل
              </h5>

              {/* Email Website  */}
              <div className="w-full flex items-end justify-between gap-6">
                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="email"
                  >
                    البريد الإلكتروني
                  </Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="contact@you.com"
                  />
                  {errors.email ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.email?.message}
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="website"
                  >
                    موقع الإلكتروني
                  </Label>
                  <Input
                    {...register("website")}
                    id="website"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="https://www.you.com"
                  />
                  {errors.website && errors.website.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.website?.message}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* PhoneNumbers */}

              <div className="w-full flex items-end justify-between gap-6">
                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="phoneNumber1"
                  >
                    رقم الهاتف الاول
                  </Label>
                  <Input
                    {...register("phoneNumber1", { required: true })}
                    id="phoneNumber1"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="+123 456 789"
                  />
                  {errors.phoneNumber1 ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.phoneNumber1?.message}
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="phoneNumber2"
                  >
                    رقم الهاتف الثاني
                  </Label>
                  <Input
                    {...register("phoneNumber2")}
                    id="phoneNumber2"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="+123 456 789"
                  />
                  {errors.phoneNumber2 && errors.phoneNumber2.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.phoneNumber2?.message}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Social Media */}

              <div className="w-full flex items-end justify-between gap-6">
                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="facebook"
                  >
                    حساب فيسبوك
                  </Label>
                  <Input
                    {...register("facebook")}
                    id="facebook"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="صفحتك على فيسبوك"
                  />
                  {errors.facebook && errors.facebook.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.facebook?.message}
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="instagram"
                  >
                    حساب انستاجرام
                  </Label>
                  <Input
                    {...register("instagram")}
                    id="instagram"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="صفحتك على انستاجرام"
                  />
                  {errors.instagram && errors.instagram.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.instagram?.message}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="w-full flex items-end justify-between gap-6">
                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="linkedIn"
                  >
                    حساب لينكد ان
                  </Label>
                  <Input
                    {...register("linkedIn")}
                    id="linkedIn"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="حسابك على لينكد ان"
                  />
                  {errors.linkedIn && errors.linkedIn.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.linkedIn?.message}
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 flex flex-col gap-2 mb-4">
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="youtube"
                  >
                    قناة يوتيوب
                  </Label>
                  <Input
                    {...register("youtube")}
                    id="youtube"
                    disabled={isLoading}
                    className="w-full"
                    placeholder="قناتك على يوتيوب"
                  />
                  {errors.youtube && errors.youtube.ref?.value ? (
                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                      {errors.youtube?.message}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* <div className="w-full flex flex-col gap-2 mb-4">
                                <Label className="text-sm text-muted-foreground" htmlFor="username">{userNameLabel}</Label>
                                <Input
                                    {...register('userName', { required: true })}
                                    id="username"
                                    disabled={isLoading}
                                    className="w-full"
                                    placeholder={userNamePlaceholder} />
                            </div> */}

              {/* {
                                errors.userName ?
                                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.userName?.message}</div>
                                    : null
                            } */}
            </div>

            {uploadErr ? (
              <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">
                {uploadErr}
              </div>
            ) : null}

          </div>



          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button disabled={isLoading} variant="outline" type="button">
                إلغاء
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <LoadingIcon /> : "إنشاء متجر"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>);
}
