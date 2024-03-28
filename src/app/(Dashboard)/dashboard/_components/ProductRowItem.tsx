import CategoryName from "@/components/CategoryName";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { HiDotsHorizontal } from "react-icons/hi";




interface Props {
    name: string;
    id: string;
    category: string;
    rating: number
    listNum:number;
    comments: number,
    handleDelete: (id: string) => void;
    handleUpdate: (id: string) => void;
}

export default function ProductRowItem({ handleDelete, handleUpdate,listNum, category, comments, id, name, rating }: Props) {

    return (<TableRow>
        <TableCell className="w-[2em]">{listNum}</TableCell>
        <TableCell className="w-[25em]">{name}</TableCell>
        <TableCell className="w-[13em]">
            <CategoryName ID={category} />
        </TableCell>
        <TableCell>{rating}</TableCell>
        <TableCell>{comments}</TableCell>
        <TableCell className="text-end">
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <HiDotsHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="start">
                    <DropdownMenuItem onClick={()=>handleUpdate(id)} >تعديل</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>handleDelete(id)} >حذف</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>

    </TableRow>)
} 