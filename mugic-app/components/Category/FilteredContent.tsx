"use client"

import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import MediaItem from "../Shared/MediaItem"
import LikeButton from "../LikedPlaylist/LikeButton"
import useOnPlay from "@/hooks/useOnPLay"
import { useSearchParams } from "next/navigation"

interface FilteredSongProps{
    songs: Song[]
}

const FilteredSong: React.FC<FilteredSongProps> = ({
    songs,

}) => {
    const param = useSearchParams();
    const id: any = param.get('categoryId')
    const filteredSongs = songs.filter(x => x.category_id == id) 

    const onPlay = useOnPlay(songs)
    const router = useRouter();
    const {isLoading, user} = useUser();
    console.log(id);
    
    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')
        }
    },[isLoading, user, router])

    if(songs.length === 0){
        return(
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            ">
                No Filtered Songs
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {filteredSongs.map((song: any) => (
        <div 
          key={song.id} 
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem onClick={(id:string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>

  );
}

export default FilteredSong;