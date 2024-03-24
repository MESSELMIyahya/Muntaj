import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export  default function SectionPart ({className,children , ...props}:Props){
    return (<section className={cn('w-full pb-8 md:pb-12 ',className)}  {...props}>{children}</section>)
}