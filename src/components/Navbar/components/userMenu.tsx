'use client';
import useAuth from "@/auth/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import UserSettingDialog from "./userSettingDialog";
import { useState } from "react";
import UserCreateStoreDialog from "./userStore";
import { HiChevronLeft, HiPlus } from "react-icons/hi";
import Link from "next/link";




export default function NavbarUserMenu() {
    const { methods: { logout }, isLoading, data: { user } } = useAuth();
    const [settingToggle, setSettingToggle] = useState(false);
    const [createStoreToggle, setStoreCreateToggle] = useState(false);
    

    return isLoading && !user ?
        <>
            <Skeleton className="h-10 w-10" />
        </>
        :
        (<>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full w-fit h-fit p-0">
                        <Avatar>
                            <AvatarImage src={user && user.pic ? user.pic : undefined} />
                            <AvatarFallback className="uppercase">
                                {user?.username.split('')[0]}
                                {user?.username.split('')[1]}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-[15em] bg-card">
                    <DropdownMenuLabel className="text-base flex items-center gap-1">
                        {user?.username}
                        <span className="text-xs text-neutral-400">({user?.email})</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSettingToggle(true)} className="mb-1" >
                        الإعدادات
                    </DropdownMenuItem>
                    {
                        user?.store ?
                            <DropdownMenuItem asChild className="group flex items-center py-1 justify-between bg-accent font-medium">
                                <Link href='dashboard'>

                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-7 h-7">
                                            <AvatarImage src={user.store && user.store.image ? user.store.image : undefined} />
                                            <AvatarFallback className="uppercase">
                                                {user?.store.name.split('')[0]}
                                                {user?.store.name.split('')[1]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="">{user.store.name}</span>
                                    </div>
                                    <HiChevronLeft className="group-focus:-translate-x-1 transition-transform size-5" />
                                </Link>

                            </DropdownMenuItem>
                            :

                            <DropdownMenuItem onClick={() => setStoreCreateToggle(true)}
                                className="flex items-center justify-between bg-primary focus:bg-primary/80 font-semibold focus:text-white text-white">
                                إنشاء متجر
                                <HiPlus className="size-5" />
                            </DropdownMenuItem>
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-red-500">
                        تسجيل الخروج
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/*  */}
            {/* Create Store Dialog */}
            {
                user?.store ? null : <UserCreateStoreDialog toggle={createStoreToggle} setToggle={setStoreCreateToggle} />
            }
            {/* Setting Dialog */}
            <UserSettingDialog toggle={settingToggle} setToggle={setSettingToggle} />
        </>)
}