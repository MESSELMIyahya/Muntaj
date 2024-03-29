import Image from "next/image";

interface Props {
    ImageSrc:string,
    owner:string,
}

export default function SquareAD ({ImageSrc,owner}:Props){

    return (<div className="relative overflow-hidden h-[12em] select-none bg-card rounded-xl border p-2  shadow-sm">
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <span className="absolute left-4 bottom-4 rounded-md px-2 py-1 bg-card/20 border border-border/10 backdrop-blur-sm text-xs md:text-sm text-accent-foreground">{owner}</span>    
        <Image alt="ad" className="w-full h-full rounded-xl object-cover" src={ImageSrc} width={600} height={400}  />
    </div>);
}