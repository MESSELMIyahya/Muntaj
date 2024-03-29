import Image from "next/image"
import Link from "next/link"




function Footer() {


    return (<footer className="bg-card border-t">

        <div className="container flex flex-col gap-y-4 items-center py-8 pb-4 px-6 ">


            <div className="w-full items-center flex flex-col text-center gap-4 ">
                <Link href='/' className="">
                    <Image alt='muntaj logo' width={200} height={100} src="/logo.png" className='w-[65px]' />
                </Link>

                <p className="text-base text-secondary-foreground">
                شارك منتجاتك مع جيرانك العرب
                </p>

            </div>

            <div className="w-full bg-border h-px" />

            <div className="w-full flex flex-col gap-4 items-center md:flex-row md:items-center md:justify-between ">

                <div className="text-center md:text-start text-base text-secondary-foreground">
                    تم تطويره وتصميمه من قبل <Link href="https://github.com/MESSELMIyahya" className="text-primary">Yahya Messelmi</Link> و <Link href="https://github.com/MohamedAdelElBaik" className="text-primary">Mohamed Adel</Link> و <Link href="https://github.com/aminechairi" target="_blank" className="text-primary">Amine Chairi</Link>
                </div>

                <div className="flex flex-col gap-4 items-center md:flex-row">


                    <ul className="flex items-center gap-3 text-muted-foreground">
                        <li><Link href="https://www.aased.org/%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA/%D9%87%D8%A7%D9%83%D8%A7%D8%AB%D9%88%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-%D9%A1%D9%A4%D9%A4%D9%A5" target="_blank" className="text-primary">هاكاثون رمضان ١٤٤٥</Link></li>
                    </ul>

                    
                    <div className="text-sm text-muted-foreground">© Copyright 2024. All Rights Reserved.</div>
                </div>
            </div>

        </div>

    </footer>)
}




export default Footer