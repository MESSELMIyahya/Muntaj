'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";



export default function SearchBar (){
    const [ text,setText ] = useState('')
    return  (<div className='w-3/6 flex items-center relative'>
        <Input value={text} onChange={(e)=>setText(e.target.value)} className='w-full py-2 px-3 rounded-r-full' placeholder="ابحث عن" />
        <Button asChild className="rounded-l-full text-sm">
            <Link href={`/search/${text} `}>
                بحث
            </Link>
        </Button>
    </div>)
}