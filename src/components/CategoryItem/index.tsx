import { cn } from "@/lib/utils"
import { IconType } from 'react-icons/lib';


interface Props {
    size?:'sm'|'lg'
    Icon:IconType
}

export default function CategoryItem ({Icon,size='sm'}:Props){

    return (<div className={cn(size=='sm'?"size-14":"size-20",'flex items-center justify-center rounded-full bg-primary/20 border-primary/30 border-2 hover:bg-primary/30 transition-colors')}>
        <Icon className={cn('text-primary',size=="sm"?"size-7":"size-10")} />
    </div>)
}