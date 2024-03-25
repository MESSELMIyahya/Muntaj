import { getCategoryNameById } from "@/lib/category"

interface Props  {
    ID:string
}

export default function CategoryName ({ID}:Props){
    const name = getCategoryNameById(ID) 
    return(<>{name}</>)
}