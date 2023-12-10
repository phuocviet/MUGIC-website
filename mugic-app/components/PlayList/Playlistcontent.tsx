"use client"

import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import MediaItem from "../Shared/MediaItem"
import LikeButton from "../LikedPlaylist/LikeButton"
import useOnPlay from "@/hooks/useOnPLay"

interface PlaylistcontentProps{
  songs: Song[]
}

 const PlayListContent:React.FC<PlaylistcontentProps> = ({songs}) => {
  const onPlay = useOnPlay(songs)
    const router = useRouter();
    const {isLoading, user} = useUser();

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
            justify-center
            text-neutral-400
            ">
                No PlayList
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
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
export default PlayListContent