'use client';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { createContext, useState } from "react";



interface AlertType {
    title: string;
    des: string;
}

export interface AlertContextType {
    alertMe: (d: AlertType) => void;
}

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);



interface Props {
    children: React.ReactNode
}

export function AlertContextProvider({ children }: Props) {
    const [alertToggle, setAlertToggle] = useState(false);
    const [data, setData] = useState<AlertType>({ des: '', title: '' });
    function alertMe(d: AlertType) {
        setData(d)
        setAlertToggle(true);
    }

    return (<>

        {/* Alert */}

        <AlertDialog open={alertToggle} onOpenChange={e => setAlertToggle(e)}>
            <AlertDialogContent >
                <AlertDialogHeader className="items-start">
                    <AlertDialogTitle>{data.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-start">{data.des}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>حسنا</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertContext.Provider value={{ alertMe }}
        >{children}</AlertContext.Provider></>)
}
