import Image from "next/image";


interface Props {
    ImageSrc:string,
    owner:string,
}

export default function LineAD ({ImageSrc,owner}:Props){


    return (<div className="w-full relative overflow-hidden select-none h-[8em] sm:h-[12em]  bg-card rounded-xl border p-2  shadow-sm">
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <span className="absolute left-4 bottom-4 rounded-md px-2 py-1 bg-card/20 border border-border/10 backdrop-blur-sm text-xs md:text-sm text-accent-foreground">{owner}</span>
        <Image alt='AD' className="w-full h-full rounded-xl object-center" src={ImageSrc} width={900} height={300}  />
    </div>);
}