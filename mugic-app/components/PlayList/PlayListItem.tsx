"use client"

import { Playlist } from "@/types";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import PlayButton from "../MusicPlayer/PlayButton";
import useLoadImagePlaylist from "@/hooks/useLoadImagePlaylist";
import internal from "stream";
import { supabase } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PlaylistItemProps{
    data: Playlist;
    onClick: (id: string) => void
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImagePlaylist(data);
    const supabase = useSupabaseClient();
    const router = useRouter();
    
    const handleDelete = async (id: string) => {
        try {
            const {data, error} = await supabase
            .from('playlist')
            .delete()
            .eq('id', id)
            
            if (error) {
                toast.error("Failing delete");
                console.error('Error deleting record:', error);
            } else {
                toast.success("Delete success");
                router.refresh();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
    }

  return (
    <div
    className="
    relative 
    group 
    flex 
    flex-col 
    items-center 
    justify-center 
    rounded-md 
    overflow-hidden 
    gap-x-4 
    bg-neutral-400/5 
    cursor-pointer 
    hover:bg-neutral-400/10 
    transition 
    p-3
    "
    >
        <div 
        className="
            relative 
            aspect-square 
            w-full
            h-full 
            rounded-md 
            overflow-hidden
        ">
            <Image
                className="object-cover"
                src={imagePath || '/images/linked.png'}
                fill
                alt="Image"
            />
        </div>
        <div className="flex items-start w-full p-4 gap-y-1">
                <p className="font-semibold text-white truncate w-full">
                    {data?.title}
                </p>
                <button onClick={()=>handleDelete(data.id)} className="hover:text-red-600">
                    <MdDelete size={25}/>{}
                </button>
            </div>
            <div 
            onClick={()=>onClick(data.id)}
            className="
                absolute
                bottom-40
                right-25
            ">
                <PlayButton/>
            </div>
    </div>
  )
}

export default PlaylistItem