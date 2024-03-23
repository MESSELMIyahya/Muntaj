'use client';
import useAuth from "@/auth/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";





export default function NavbarUserMenu() {
    const { methods: { logout }, isLoading, data: { user } } = useAuth()

    return isLoading && user ?
        <>
            <Skeleton className="h-10 w-10" />
        </>
        :
        (<DropdownMenu>
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
            <DropdownMenuContent side="bottom" align="start" className="w-[15em] bg-card">
                <DropdownMenuLabel className="text-base flex items-center gap-1">
                    {user?.username}
                    <span className="text-xs text-neutral-400">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sitting</DropdownMenuItem>
                <DropdownMenuLabel>Store</DropdownMenuLabel>
                <DropdownMenuItem className="flex gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback className="uppercase">
                            PF
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}