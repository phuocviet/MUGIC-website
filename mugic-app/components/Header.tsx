"use client"

import { useRouter } from "next/navigation";
import {IconBaseProps} from 'react-icons'
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {useUser} from '@/hooks/useUser'
import { FaUserAlt } from "react-icons/fa";
import {TbCrown} from 'react-icons/tb'
import toast from "react-hot-toast";
import { useState } from "react";

interface HeaderProps extends IconBaseProps{
    children: React.ReactNode;
    className?:string;
}
interface RxCaretLeft {
    className?:string;
    size: number
}
const Header:React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const [isUpgraded, setIsUpgraded] = useState(false)
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser()

    const handleLogout = async () =>{
        const {error} = await supabaseClient.auth.signOut();
        // TODO: reset any playing songs
        router.refresh();

        if(error){
            toast.error(error.message)
        }else{
            toast.success('Logged out')
        }
    }
  return (
    <div className={twMerge(`
       h-fit
       bg-gradient-to-b
       from-sky-800
       p-6 
    `,className)}>
        <div className="
            w-full
            mb-4
            flex
            items-center
            justify-between
        ">
            <div className="hidden md:flex gap-x-2 items-center">
                <button
                title="left-btn"
                onClick={()=>router.back()}
                className="
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
                "
                >
                    <span className='text-white'>    
                        <RxCaretLeft size={35} />
                    </span>
                </button>
                <button
                title="right-btn"
                onClick={()=>router.forward()}
                className="
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
                "
                >
                    <span className='text-white' >
                        <RxCaretRight size={35}/>
                    </span>
                </button> 
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <button
                className="
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                "
                >
                    <span className="text-black">
                        <HiHome size={20}/>{}
                    </span>
                </button>
                <button
                className="
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                "
                >
                    <span className="text-black">
                        <BiSearch size={20}/>{}
                    </span>
                </button>
            </div>
            <div
                className="
                flex
                justify-center
                items-center
                gap-x-4
                "
            >
                {user?(
                    <div className="flex gap-x-4 items-center gap-4">
                        {isUpgraded?
                        <></>
                        :
                        <button 
                        className="cursor-pointer flex hover:text-yellow-300 transition"
                        onClick={()=>{}}
                        >
                            Upgrade
                            <span>
                                <TbCrown size={20}/>
                            </span>
                        </button>
                        }
                        <Button
                            onClick={handleLogout}
                            className="bg-white px-6 py-2"
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={()=>router.push('/account')}
                            className="bg-white"
                        >
                            <FaUserAlt/>
                        </Button>
                    </div>
                ):(
                <>
                    <div>
                        <Button 
                            onClick={authModal.onOpen}
                            className="
                                bg-transparent
                                text-neutral-300
                                font-medium
                            "
                        >
                            Sign up
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={authModal.onOpen}   
                            className="
                                bg-transparent
                                text-neutral-300
                                font-medium
                            "
                        >
                            Log in
                        </Button>
                    </div>
                </>)}
            </div>
        </div>
        {children}
    </div>
  );
}

export default Header
