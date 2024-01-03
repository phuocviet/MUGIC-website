"use client"

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubBoxProps{
    isShow: boolean;
    items: any[] | undefined;
    song: Song
}

const SubBox: React.FC<SubBoxProps> = ({
    isShow,
    items,
    song
}) => {
  const {supabaseClient} = useSessionContext();
  const {user} = useUser();
  const router = useRouter();
  
  const handleAddToPlaylist = async (playlist: any) => {
    if(!user){
      toast.error("Session user is null or undefined");
      return ;
    }
    const {error} = await supabaseClient
    .from('playlist_songs')
    .insert({
        song_id: song.id,
        user_id: user.id,
        playlist_id: playlist.id
    });

    if(error){
        toast.error(error.message)
    }else{
        toast.success(`Added to ${playlist.title}`)
    }
    router.refresh();
  }

  if(isShow){
  return (
    <div 
    className="
    flex 
    flex-col
    row-auto 
    text-center
    bg-black
    rounded-md  
    pt-1
    pb-1
    w-[150px]
    ">
      {items?.map((item, index)=>(
        <div 
        key={index} 
        className="cursor-pointer hover:text-gray-400 transition rounded-lg"
        onClick={()=> handleAddToPlaylist(item)}
        >
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
  }
  return ;
}


export default SubBox;