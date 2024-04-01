import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import getStore from "@/lib/store";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { notFound, redirect } from "next/navigation";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { RiLinkedinFill, RiInstagramFill, RiFacebookFill } from "react-icons/ri";
import SectionPart from "@/components/SectionPart";
import { LuAtSign, LuCopy, LuExternalLink, LuGlobe, LuPhone } from "react-icons/lu";
import { Metadata } from "next";

interface InfoItemProps {
  text: string;
  Icon: IconType;
}

const InfoItem = ({ Icon, text }: InfoItemProps) => {
  return (<div className="group relative flex justify-start items-center gap-3 p-2 px-3 rounded-md bg-primary/10">
    <Icon className="size-5 text-primary" /> 
    <span className="text-base line-clamp-1 text-secondary-foreground">{text}</span>
  </div>);
}

interface MediaAccountType {
  Icon: IconType;
  link: string;
}

const MediaAccount = ({ Icon, link }: MediaAccountType) => {

  return (<Link href={link} className="size-12 flex justify-center items-center bg-primary/10 transition-colors hover:bg-primary/30 rounded-lg active:scale-95">
    <Icon className="size-7 text-primary" />
  </Link>)
}




// Meta data

interface Props {
  params: {
    id: string
  }
}


// generating meta data

export async function generateMetadata({params}:Props){
  const res = await getStore(params.id);
  
  if (!res) {
    throw notFound()
  }

  return { 
    title:"منتج - " + res?.store.name,
    description : res.store.description  
  } as Metadata
}


export default async function page({ params }: Props) {
  const res = await getStore(params.id);

  if (!res) {
    throw notFound()
  }

  const { store, products } = res;

  return (
    <div className="mt-12 md:mt-16 max-w-6xl m-auto px-2 space-y-8">
      <Card className="relative">
        <img
          src={store.storeCoverImage}
          width={1600}
          height={1200}
          loading="lazy"
          alt="store cover"
          className="rounded-md h-[15em] object-cover object-center"
        />
        <div className="absolute -bottom-10 md:-bottom-16 right-6 md:right-12 rounded-full aspect-square border-4 md:border-8 border-white overflow-hidden">
          <img
            src={store.storeImage}
            width={500}
            height={500}
            alt="store profile"
            className="w-[100px] md:w-[150px]"
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-4 gap-8 pt-8">
        <Card className="col-span-2">
          <CardHeader className="text-3xl font-semibold">
            {store.name}
          </CardHeader>
          <CardContent>
            <CardDescription>{store.description}</CardDescription>
          </CardContent>
        </Card>

        <Card className="col-span-2 flex flex-col px-3 py-3">
          <div className="w-full grid grid-cols-1 gap-2 mb-4">
            <InfoItem Icon={LuAtSign} text={store.contact.email} />
            {store.contact.website ?
              <InfoItem Icon={LuGlobe} text={store.contact.website} />
              : null
            }
            <InfoItem Icon={LuPhone} text={store.contact.phoneNumbers[0]}  />
            {
              store.contact.phoneNumbers[1] ?
                <InfoItem Icon={LuPhone} text={store.contact.phoneNumbers[1]}  />
                : null
            }
          </div>
          <div className="w-full flex justify-center gap-6 flex-wrap">
            {
              store.contact.socialMedia?.linkedIn ?
                <MediaAccount Icon={RiLinkedinFill} link={store.contact.socialMedia?.linkedIn} />
                : null
            }
            {
              store.contact.socialMedia?.youtube ?
                <MediaAccount Icon={RiInstagramFill} link={store.contact.socialMedia?.youtube} />
                : null
            }
            {
              store.contact.socialMedia?.instagram ?
                <MediaAccount Icon={RiInstagramFill} link={store.contact.socialMedia?.instagram} />
                : null
            }
            {
              store.contact.socialMedia?.facebook ?
                <MediaAccount Icon={RiFacebookFill} link={store.contact.socialMedia?.facebook} />
                : null
            }
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-2xl font-semibold text-center">
          المنتجات
        </CardHeader>
      </Card>
      <SectionPart className="justify-center flex gap-2 flex-wrap">
        {
          products && products.map((e) =>
            <ProductCard
              key={e._id}
              category={e.category}
              country={e.country}
              description={e.description}
              title={e.name}
              image={e.primaryImage}
              rated={false}
              id={e._id}
              rating={e.rating || 0}
              store={{ name: e.store.name, id: e.store._id, contact: e.store.contact }}
            />
          )
        }

      </SectionPart>
    </div>
  );
}
