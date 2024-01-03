import getPlaylistSongs from "@/action/getPlaylistSongs";
import PlayListContent from "@/components/PlayList/PlaylistContent";
import Header from "@/components/Shared/Header";
import React from "react";

interface PlaylistProps{
  searchParams:{
    playlistId: any
  }
};

export const revalidate = 0;


const Playlist = async ({searchParams}:PlaylistProps) => {
  
  const songs = await getPlaylistSongs(searchParams.playlistId);
  
  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header>
        <div className="mt-20">
          <div className="
          flex
          flex-col
          md:flex-row
          items-center
          gap-x-5
          ">
            <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            md:mt-0
            ">
              <h1 className="hidden md:block font-semibold text-xl">
                PlayList
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <PlayListContent songs={songs}/>
    </div>
  )
}

export default Playlist