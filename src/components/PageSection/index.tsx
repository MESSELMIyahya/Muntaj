import { cn } from "@/lib/utils";


interface Props extends React.HTMLAttributes<HTMLDivElement> {

}


export  default function PageSection ({className,children , ...props}:Props){
    return (<section className={cn('container lg:px-[4rem] xl:px-[10rem] pt-16 lg:pt-24 pb-12',className)}  {...props}>{children}</section>)
}