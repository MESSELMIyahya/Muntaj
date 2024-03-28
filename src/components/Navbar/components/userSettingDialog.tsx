import useAuth from "@/auth/hooks/useAuth";
import LoadingIcon from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { z } from "zod";



const userNameSchema = z.string().min(5, 'userName must be more then 4 characters')



interface Props {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}


export default function UserSettingDialog({ setToggle, toggle }: Props) {
    const { data: { user } } = useAuth()
    const { updateData } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imgURLShower, setImgURLShower] = useState(user?.pic);
    const [imgErr, setImgErr] = useState('');
    const [userNameErr, setUserNameErr] = useState('');
    const [userName, setUserName] = useState(user?.username);


    function updateLoadImage(files: File[] | null) {
        setImgErr('')
        if (!files || !files[0]) return;
        const file = files[0];
        if (file.size > 2_097_152) {
            setImgErr('يجب ان يكون حجم الصورة اقل من 2MB');
            return
        }
        const url = URL.createObjectURL(file);
        setImgURLShower(url);
        setImageFile(file);
    }

    async function handleUpdateMyData() {
        setUserNameErr('');
        setImgErr('');
        setIsLoading(true)
        try {
            userNameSchema.parse(userName);
        } catch {
            setUserNameErr("يجب ان يكون اسم المستخدم اكثر من 4 احرف");
            setIsLoading(false);
            return;
        }
        try {
            const body = new FormData()
            if(imageFile) body.append('profileImage', imageFile);
            if(userName) body.append('userName', userName)
            await updateData(body as never);
            setToggle(false)
        } catch (err) {
            console.log('something  went wrong', err);
        }
        setIsLoading(false);
    }

    return (
        <Dialog open={toggle} onOpenChange={setToggle} >
            <DialogContent className="sm:max-w-full md:w-[40em]">
                <DialogHeader>

                    <DialogTitle>
                        الاعدادات
                    </DialogTitle>
                    <DialogDescription>
                        يمكنك تغيير معلموماتك الشخصية و صورة ملفك الشخصي
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium leading-none text-right">
                            صورة الملف الشخصي
                        </span>

                        <input onChange={(e) => updateLoadImage(e.target.files as File[] | null)} accept="image/png, image/jpeg , image/jpg" id="img" type="file" className="hidden" />

                        <label style={{ backgroundImage: `url('${imgURLShower}')` }} htmlFor="img" className="w-16 h-16 bg-card border hover:opacity-60 cursor-pointer bg-center bg-cover rounded-full">

                        </label>

                    </div>
                    {
                        imgErr ?
                            <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2">{imgErr}</div>
                            : null
                    }
                </div>

                <div className="flex flex-col gap-4 pb-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            أسم المستخدم
                        </Label>
                        <Input disabled={isLoading} id="username" placeholder="كنيتك" onChange={(e) => setUserName(e.target.value)} value={userName} className="col-span-3" />
                    </div>
                    {
                        userNameErr ?
                            <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2">{userNameErr}</div>
                            : null
                    }
                </div>

                <DialogFooter className="gap-3">
                    <DialogClose asChild>
                        <Button disabled={isLoading} variant="outline" type="submit">
                            إلغاء
                        </Button>
                    </DialogClose>
                    <Button disabled={isLoading} onClick={handleUpdateMyData}>
                        {
                            isLoading ? <LoadingIcon /> : 'حفظ'
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>)
}