"use client"

import { Playlist } from "@/types";
import Image from "next/image";
import PlayButton from "../MusicPlayer/PlayButton";
import useLoadImagePlaylist from "@/hooks/useLoadImagePlaylist";

interface PlaylistItemProps{
    data: Playlist;
    onClick: (id: string) => void
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImagePlaylist(data);

  return (
    <div
    onClick={()=>onClick(data.id)}
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
        <div className="flex flex-col items-start w-full p-4 gap-y-1">
                <p className="font-semibold text-white truncate w-full">
                    {data?.title}
                </p>
                
            </div>
            <div className="
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