'use client'

import useAlert from "@/hooks/useAlert";
import LoadingIcon from "@/components/LoadingIcon";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useUser from "@/hooks/useUser";
import AxiosReq from "@/lib/axios";
import { StoreType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
    store:StoreType;
    refetch:()=>Promise<void>
}


export default function SettingSection({store,refetch}:Props) {
    const { updateData } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");

    // form stuff
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateStoreType>({
        resolver: zodResolver(createStoreSchema),
        defaultValues:store ? {
            address:store.location.address,
            phoneNumber1:store.contact.phoneNumbers[0],
            phoneNumber2:store.contact?.phoneNumbers[1],
            description:store.description,
            name:store.name,
            email:store.contact.email,
            website:store.contact?.website,
            instagram:store.contact?.socialMedia?.instagram,
            facebook:store.contact?.socialMedia?.facebook,
            youtube:store.contact?.socialMedia?.youtube,
            linkedIn:store.contact?.socialMedia?.linkedIn
        }: undefined ,
    });

    // Alert
    const { alertMe } = useAlert()
    // Image stuff
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [coverImageURL, setCoverImageUrl] = useState(store?.storeCoverImage||'');
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImageURL, setProfileImageUrl] = useState(store?.storeImage||'');
    const [imageErr, setImageErr] = useState("");


    // delete store
    const [deleteProductToggle,setDeleteProductToggle] = useState(false);
    const { replace } = useRouter()
    // handleDeleteStore
    const handleDeleteStore = async()=>{
        try{
            await AxiosReq.delete('api/v1/user/store')
            replace('/');
            setDeleteProductToggle(false);
            updateData({})
            alertMe({
                title: 'تم حذف المتجر بنجاح',
                des: 'الان قم بتصفح المنتجات المعروضة في المنصة'
            })
        }catch(err){
            console.log("Delete Store",err)
        }
    }

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
        setUploadErr('');

        setIsLoading(true);

        const formData = new FormData();
       store?.name !== data.name && formData.append('name', data.name);
        formData.append('description', data.description);
        profileImageFile && formData.append('storeImage', profileImageFile);
        coverImageFile && formData.append('storeCoverImage', coverImageFile);
        formData.append('contact[phoneNumbers][0]', data.phoneNumber1); // Convert array to JSON string
        formData.append('contact[email]', data.email);
        formData.append('location[address]', data.address);

        // Add optional fields
        if (data.phoneNumber2) formData.append('contact[phoneNumbers][1]', data.phoneNumber2); // Convert array to JSON string
        if (data.website) formData.append('contact[website]', data.website);
        if (data.facebook) formData.append('contact[socialMedia][facebook]', data.facebook);
        if (data.instagram) formData.append('contact[socialMedia][instagram]', data.instagram);
        if (data.linkedIn) formData.append('contact[socialMedia][linkedIn]', data.linkedIn);
        if (data.youtube) formData.append('contact[socialMedia][youtube]', data.youtube);

        try {

            await AxiosReq.put('api/v1/user/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await refetch();
            alertMe({
                title: 'تم حفظ تعديلات على متجرك بنجاح 🎉',
                des: 'تم حفظ جميع التعديلات التي قمت بها على متجرك'
            })
            updateData({});
        } catch (err) {
            setUploadErr('حدث شيئ غير متوقع حاول مرة اخر')
            console.log(err);
        }

        setIsLoading(false)
    };

    return (<><div className="w-full">

        <div className="w-full flex items-center justify-between mb-4">
            <div className="text-xl font-medium text-accent-foreground">
                اعدادات المتجر
            </div>
        </div>

        <div className="w-full">

            <form onSubmit={handleSubmit(handleCreateStore)}>
                <div className="w-full p-4">
                    <div className="w-full mb-[5em]">
                        <label
                            style={{ backgroundImage: `url('${coverImageURL}')` }}
                            htmlFor="coverImg"
                            className="w-full flex h-[8em] md:h-[10em] cursor-pointer select-none justify-center items-center border-dashed rounded-xl bg-center bg-cover bg-no-repeat bg-accent hover:opacity-90">
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
                                    className="w-[8em] h-[8em] flex cursor-pointer select-none justify-center items-center border-dashed rounded-full bg-center bg-cover bg-no-repeat bg-accent hover:opacity-90 "></label>
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
                                {errors.address ? (
                                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                                        {errors.address?.message}
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

                    </div>

                    {uploadErr ? (
                        <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">
                            {uploadErr}
                        </div>
                    ) : null}

                    <div className="w-full flex justify-end mt-4">
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? <LoadingIcon /> : "حفظ التعديلات"}
                        </Button>

                    </div>

                </div>
            </form>

        </div>

        <div className="w-full flex items-center gap-4 rounded-xl mt-4">
            <div className="text-base font-medium text-red-950">
                حذف المتجر 
            </div>
            <Button onClick={()=>setDeleteProductToggle(true)} variant="destructive" className="text-sm h-8" size="sm">حذف</Button>
        </div>

    </div>
    
    {/* delete store dialog */}
        
    <AlertDialog open={deleteProductToggle} onOpenChange={e => setDeleteProductToggle(e)}>
            <AlertDialogContent >
                <AlertDialogHeader className="items-start">
                    <AlertDialogTitle>
                        هل انت متاكد من هذا الاجراء
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-start">
                        لن تستطيع إلغاء هذا الإجراء بعد قبولك
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={handleDeleteStore} variant="destructive">متأكد</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
    </AlertDialog>
    
    </>)
}
