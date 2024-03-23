import getServerAuth from '@/auth/server';
import MainText from '@/langs/AR/main.json';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import NavbarUserMenu from './components/userMenu';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { HiMenu } from 'react-icons/hi'

const Texts = MainText.components.header



export default async function Navbar() {
    const { isAuthenticated } = await getServerAuth();


    return (<><header className="w-full fixed top-0 left-0 z-50 bg-card border-b shadow-sm">

        <div className="container w-full flex items-center justify-between py-3">


            <Link href="/" >
                <Image alt='muntaj logo' width={200} height={100} src="/logo.png" className='w-[65px] md:w-[90px] ' />
            </Link>


            <div className='w-3/6 relative'>
                <Input className='w-full py-2 px-3 rounded-full' placeholder={Texts.searchBar.placeholder} />
            </div>

            {
                isAuthenticated ?
                    <NavbarUserMenu />

                    : <>

                        <div className="items-center gap-4 hidden md:flex">

                            <Button asChild variant="outline" className='rounded-full'>
                                <Link href="/login">
                                    {Texts.login}
                                </Link>
                            </Button>

                            <Button asChild className='rounded-full'>
                                <Link href="/register">
                                    {Texts.register}
                                </Link>
                            </Button>

                        </div>


                        <div className='block md:hidden'>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <HiMenu className='size-5'/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" className='w-[10em]'>
                                    
                                    <DropdownMenuItem >
                                        <Button asChild variant="outline" className='w-full'>
                                            <Link href="/login">
                                                {Texts.login}
                                            </Link>
                                        </Button>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem >
                                        <Button asChild className='w-full'>
                                            <Link href="/login">
                                                {Texts.register}
                                            </Link>
                                        </Button>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </>
            }

        </div>

    </header>

        <div className="w-full py-4 lg:py-2 " />
    </>)
}