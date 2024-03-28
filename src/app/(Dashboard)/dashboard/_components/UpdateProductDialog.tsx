
import useAlert from "@/hooks/useAlert";
import CategoryIcon from "@/components/CategoryIcon";
import CategoryName from "@/components/CategoryName";
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
import AxiosReq from "@/lib/axios";
import { categoriesIds } from "@/lib/category";
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
        .min(5, "يجب ان يكون اسم المنتج اكثر 5 من حرف")
        .max(60, "يجب ان يكون اسم المنتج اقل من 60 حرف"),
    description: z.string().min(30, "يجب ان يكون الوصف المنتج اكثر من 30 حرف"),

});

type CreateStoreType = z.infer<typeof createStoreSchema>;

interface Props {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    refetch:()=>Promise<void>;
    product:{
        id:string;
        description:string;
        image:string;
        name:string;
        category:string,
    }
}

export default function UpdateProductDialog({ product,setToggle,refetch, toggle }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");

    // form stuff
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateStoreType>({
        resolver: zodResolver(createStoreSchema),
        defaultValues:product ?{
            description:product?.description,
            name:product?.name
        } : undefined
    });
    const [category, setCategory] = useState(product?product?.category:'ct1');
    const [categoryErr, setCategoryErr] = useState(false);

    // Alert
    const { alertMe } = useAlert()
    // Image stuff
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImageURL, setProfileImageUrl] = useState(product?product?.image:'');
    const [imageErr, setImageErr] = useState("");

    // handle uploading images
    function updateLoadImage(files: File[] | null) {
        setImageErr("");
        if (!files || !files[0]) return;

        const file = files[0];
        if (file.size > 2_097_152) {
            setImageErr("يجب ان يكون حجم صورة المتجر اقل من 2MB");
            return;
        }

        const url = URL.createObjectURL(file);
        setProfileImageUrl(url);
        setProfileImageFile(file);
    }

    const handleCreateStore: SubmitHandler<CreateStoreType> = async (data) => {
        setCategoryErr(false);
        setUploadErr('');

        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        profileImageFile && formData.append('primaryImage', profileImageFile);
        formData.append('category', category);


        try {

            await AxiosReq.put('api/v1/user/product/'+product.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await refetch();
            alertMe({
                title: 'تم حفظ تعديلات على منتجك بنجاح 🎉',
                des: 'تم حفظ جميع التعديلات التي قمت بها على منتجك'
            })
            refetch();
            setToggle(false);
        } catch (err) {
            setUploadErr('حدث شيئ غير متوقع حاول مرة اخر')
            console.log(err);
        }

        setIsLoading(false)
    };


    return (
        <Dialog open={toggle} onOpenChange={setToggle}>
            <DialogContent className="sm:max-w-full md:w-[55em]">
                <DialogHeader>
                    <DialogTitle>إضافة منتج</DialogTitle>
                    <DialogDescription>
                        قم بإضافة منتجك وعرضه للمستثمرين
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleCreateStore)}>


                    <div className="w-full p-4 h-fit">


                        <div className="w-full flex gap-4 flex-col md:flex-row">
                            <div className="w-full md:w-fit">
                                <input
                                    onChange={(e) => {
                                        updateLoadImage(e.target.files as File[] | null);
                                        e.target.files = null;
                                    }}
                                    id="profileImg"
                                    type="file"
                                    disabled={isLoading}
                                    accept="image/png, image/jpeg , image/jpg"
                                    className="hidden"
                                />

                                <label
                                    style={{ backgroundImage: `url('${profileImageURL}')` }}
                                    htmlFor="profileImg"
                                    className="w-full md:w-[18em] h-[18em] flex rounded-xl cursor-pointer select-none justify-center items-center border-dashed bg-center bg-cover bg-no-repeat border-2 bg-primary/30 hover:opacity-90 transition-opacity border-primary/50">
                                    {!profileImageFile ? (
                                        <span className="text-xs font-medium text-primary/50">
                                            إضافة صورة
                                        </span>
                                    ) : null}
                                </label>

                                {imageErr ? (
                                    <div className="w-auto p-2 rounded-md text-sm text-red-600 bg-red-500/20 mt-2">
                                        {imageErr}
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-full ">

                                <h5 className="text-lg font-medium text-accent-foreground mb-4">
                                    معلومات المنتج
                                </h5>

                                <div className="flex items-end justify-between gap-6">
                                    <div className="w-1/2 flex flex-col gap-2 mb-4">
                                        <Label
                                            className="text-sm text-muted-foreground"
                                            htmlFor="name">
                                            اسم المنتج
                                        </Label>
                                        <Input
                                            {...register("name", { required: true })}
                                            id="name"
                                            disabled={isLoading}
                                            className="w-full"
                                            placeholder={"اسم المنتج"}
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
                                            htmlFor="category">
                                            صنف المنتج
                                        </Label>
                                        <div className="w-full">
                                            <Select disabled={isLoading} defaultValue={category} onValueChange={(v) => setCategory(v)}>
                                                <SelectTrigger id="category" dir="rtl" className="w-full">
                                                    <SelectValue placeholder="الصنف" />
                                                </SelectTrigger>
                                                <SelectContent dir="rtl">
                                                    {
                                                        categoriesIds.map(e =>
                                                            <SelectItem key={e} value={e} >
                                                                <div className="flex items-center gap-2">
                                                                    <CategoryIcon categoryId={e} className="w-4" />
                                                                    <CategoryName ID={e} />
                                                                </div>
                                                            </SelectItem>
                                                        )
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {categoryErr ? (
                                            <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">
                                                اختر صنف
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
                                        className="w-full h-[9em] resize-none"
                                        placeholder={"وصف المتجرك"}
                                    />
                                </div>
                                {errors.description ? (
                                    <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2">
                                        {errors.description?.message}
                                    </div>
                                ) : null}

                            </div>
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
                            {isLoading ? <LoadingIcon /> : "حفظ التعديلات"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>);
}
