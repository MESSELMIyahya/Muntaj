"use client";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { HiExternalLink } from "react-icons/hi";
import Link from "next/link";
import CountryFlag from "../CountryFlag";
import GetCountryName from "@/lib/country";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CategoryName from "../CategoryName";
import useContact from "@/hooks/useContact";

interface Props {
  image: string;
  rating: number;
  rated: boolean;
  category: string;
  country: string;
  id: string;
  title: string;
  description: string;
  store: {
    name: string;
    id: string;
    contact:{
      phoneNumbers: string[];
      email: string;
      website?: string; // => this is optional
      socialMedia: {
        // all of the sm account are optional
        facebook?: string;
        instagram?: string;
        linkedIn?: string;
        twitter?: string;
        youtube?: string;
      };
    };
  };
}

export default function ProductCard({
  id,
  rating,
  store,
  title,
  category,
  country,
  description,
  image,
  rated,
}: Props) {
  const [IRated, setIRated] = useState(rated || false);

  const handleRate = () => {
    setIRated((e) => !e);
  };
  const {contact} = useContact()

  return (
    <div className="w-full md:w-[21em] p-4 rounded-xl bg-card duration-300 hover:duration-300 transition-colors hover:transition-colors hover:bg-accent hover:shadow-sm border ">
      <div className="w-full h-[16em] relative bg-white border overflow-hidden rounded-xl mb-4 ">
        <Image
          className="w-full h-full object-contain"
          src={image}
          loading="lazy"
          width={200}
          height={300}
          alt="product"/>
        <div className="absolute right-2 bottom-2 rounded-md p-1 bg-card font-medium text-sm select-none text-card-foreground border flex items-center gap-1">
          {rating}
          <HiStar className="size-4 text-amber-500" />
        </div>
      </div>

      <div className="w-full">
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge className="flex items-center gap-1 rounded-sm ">
              <CategoryName ID={category} />
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center gap-1 rounded-sm"
            >
              {GetCountryName(country)}
              <CountryFlag country={country} className="w-4" />
            </Badge>
          </div>

          <Link href={`/store/${store.id}`}>
            <Badge
              variant="secondary"
              className="w-[8em] group relative flex justify-center select-none cursor-pointer overflow-hidden rounded-md text-sm"
            >
              {store.name}
              <HiExternalLink className="absolute hidden group-hover:block size-5 bg-inherit text-muted-foreground right-1 z-10" />
            </Badge>
          </Link>
        </div>

        <Link
          href={`/product/${id}`}
          className="text-xl transition-colors hover:text-primary line-clamp-2 text-accent-foreground font-medium mb-2"
        >
          {title}
        </Link>
        <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
          {description}
        </p>
      </div>

      <div className="w-full flex gap-2 items-center">
        <Button onClick={()=>contact({name:store.name,info:store.contact})} className="flex-1">تواصل</Button>
        <Button onClick={handleRate} variant="outline" size="icon">
          <HiStar
            className={cn(
              "size-6 transition-colors",
              IRated ? "text-amber-500" : "text-neutral-300"
            )}
          />
        </Button>
      </div>
    </div>
  );
}
