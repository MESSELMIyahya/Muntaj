'use client';

import { Link } from "lucide-react";
import { HiExternalLink } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { LuCopy } from "react-icons/lu";

interface InfoItemProps {
  type?: 'link' | 'copy'
  text: string;
  link?: string;
  Icon: IconType;
}

const InfoItem = ({ type, Icon, link, text }: InfoItemProps) => {
  const copyText = () => {
    navigator.clipboard.writeText(text);
  }

  return (<div className="group relative flex justify-end items-center gap-3 p-2 px-3 rounded-md bg-primary/10">
    <span className="text-base line-clamp-1 text-secondary-foreground">{text}</span>
    <Icon className="size-5 text-primary" />
    {
      type ?
        <span className="absolute hidden group-hover:block active:scale-95 right-2 cursor-pointer p-1 bg-primary/20 text-primary rounded-md">
          {type == 'copy' ?
            <LuCopy onClick={copyText} className="size-4" />
            : <Link href={link || '/'}>
              <HiExternalLink className="size-4" />
            </Link>
          }
        </span> :
        null
    }
  </div>);
}

export default InfoItem;