'use client';
import InfoItem from "@/components/InfoItem";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { createContext, useState } from "react";
import { IconType } from "react-icons/lib";
import { LuAtSign, LuGlobe, LuPhone } from "react-icons/lu";
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from 'react-icons/ri'


interface MediaAccountType {
    Icon: IconType;
    link: string;
}

const MediaAccount = ({ Icon, link }: MediaAccountType) => {

    return (<Link href={link} className="size-12 flex justify-center items-center bg-primary/10 transition-colors hover:bg-primary/30 rounded-lg active:scale-95">
        <Icon className="size-7 text-primary" />
    </Link>)
}


interface contactInfoType {
    name:string;
    info: {
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
}

export interface ContactContextType {
    contact: (d: contactInfoType) => void
}

export const ContactContext = createContext<ContactContextType>({} as ContactContextType);


interface Props {
    children: React.ReactNode
}

export function ContactContextProvider({ children }: Props) {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState<contactInfoType>({ name:'',info:{email:'',phoneNumbers:[],socialMedia:{}} });

    function contact(d: contactInfoType) {
        setData(d)
        setToggle(true);
    }

    return (<>

        <Dialog open={toggle} onOpenChange={(e) => setToggle(e)} >
            <DialogContent className="md:w-[25em]">
                <DialogHeader>
                    <DialogTitle>تواصل مع {data.name}</DialogTitle>
                </DialogHeader>
                <div className="w-full py-2">

                    {/* contact  info */}
                    <div className="flex flex-col gap-2">

                        <div className="w-full grid grid-cols-1 gap-2 mb-4">
                            <InfoItem Icon={LuAtSign} text={data.info.email} type="copy" />
                            {data.info.website?
                                <InfoItem Icon={LuGlobe} text={data.info.website} type="link" />
                                :null
                            }
                            <InfoItem Icon={LuPhone} text={data.info.phoneNumbers[0]} type="copy" />   
                            {
                                data.info.phoneNumbers[1] ?
                                    <InfoItem Icon={LuPhone} text={data.info.phoneNumbers[1]} type="copy" />   
                                : null
                            }
                        </div>
                        <div className="w-full flex justify-center gap-6 flex-wrap ">
                            
                            {
                                data.info.socialMedia?.linkedIn ? 
                                    <MediaAccount Icon={RiLinkedinFill} link={data.info.socialMedia?.linkedIn} />
                                :null
                            }
                            {
                                data.info.socialMedia?.youtube ? 
                                    <MediaAccount Icon={RiInstagramFill} link={data.info.socialMedia?.youtube} />
                                :null
                            }
                            {
                                data.info.socialMedia?.instagram ? 
                                    <MediaAccount Icon={RiInstagramFill} link={data.info.socialMedia?.instagram} />
                                :null
                            }
                            {
                                data.info.socialMedia?.facebook ? 
                                    <MediaAccount Icon={RiFacebookFill} link={data.info.socialMedia?.facebook} />
                                :null
                            }
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>

        <ContactContext.Provider value={{ contact }}
        >{children}</ContactContext.Provider></>)
}
