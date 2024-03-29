'use client';
import CategoryName from "@/components/CategoryName";
import CountryFlag from "@/components/CountryFlag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useContact from "@/hooks/useContact";
import GetCountryName from "@/lib/country";
import Link from "next/link";
import { HiStar } from "react-icons/hi";



export default function ProductContent({
    category,
    description,
    country,
    storeId,
    storeImg,
    contact,
    storeName,
    title,
}: {
    country: string;
    category: string;
    title: string;
    storeId: string;
    storeImg: string;
    storeName: string;
    contact: {
        phoneNumbers: string[];
        email: string;
        website?: string;
        socialMedia: {
            facebook?: string;
            instagram?: string;
            linkedIn?: string;
            twitter?: string;
            youtube?: string;
        };
    }
    description: string;
}) {

    const { contact: contactME } = useContact()

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Badge className="flex items-center gap-1 rounded-sm text-base ">
                        <CategoryName ID={category} />
                    </Badge>
                    <Badge
                        variant="outline"
                        className="flex text-base items-center gap-1 rounded-sm">
                        {GetCountryName(country)}
                        <CountryFlag country={country} className="w-5" />
                    </Badge>
                </div>

                <Link href={'/store/'+storeId} className="flex items-center select-none gap-2 px-2 py-1 rounded-md bg-accent hover:bg-accent/80">
                    <Avatar className="size-8">
                        <AvatarImage src={storeImg ? storeImg : undefined} />
                        <AvatarFallback className="uppercase">
                            {storeName.split('')[0]}
                            {storeName.split('')[1]}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-base text-secondary-foreground font-semibold">{storeName}</span>
                </Link>

            </div>
            <h1 className="text-2xl">{title}</h1>
            <p className="text-lg flex-1 line-clamp-5">{description}</p>
            <div className="flex items-center gap-6">
                <Button onClick={() => contactME({ info: contact, name: storeName })} className="flex-1">تواصل</Button>
                <Button variant="outline" size="icon">
                    <HiStar className="size-6 transition-colors text-neutral-300" />
                </Button>
            </div>
        </>
    );
}