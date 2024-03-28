'use client';
import useAlert from "@/hooks/useAlert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AxiosReq from "@/lib/axios";


interface Props {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    id:string;
    refetch:()=>Promise<void>;
}

export default function DeleteProductDialog({refetch,id,setToggle,toggle }: Props) {
    const { alertMe } = useAlert()

    const handleDeleteProduct = async () => {
        try{
            await AxiosReq.delete('api/v1/user/product/'+id);
            refetch();
            alertMe({
                title: 'تم حذف المنتج بنجاح',
                des:'الان قم بإضافة منتجات اخرى وعرضها للمستثمرين'
            })
        }catch(err){
            console.log("Delete Product",err)
        }
    }

    return (<>

        <AlertDialog open={toggle} onOpenChange={e => setToggle(e)}>
            <AlertDialogContent >
                <AlertDialogHeader className="items-start">
                    <AlertDialogTitle>
                        هل انت متاكد من رغبتك في حذف هذا المنتج
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-start">
                        لن تستطيع إلغاء هذا الإجراء بعد قبولك
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={handleDeleteProduct} variant="destructive">متأكد</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>



    </>)
}