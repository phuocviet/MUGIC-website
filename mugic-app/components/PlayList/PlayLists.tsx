"use client"

import { Playlist } from '@/types'
import React from 'react'
import {useUser} from '@/hooks/useUser'
import PlayListButton from './PlayListButton';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadPlaylist from '@/hooks/useUploadPlaylist';
import PlaylistItem from './PlayListItem';


interface PlayListProps{
    playlists: Playlist[];
}

const PlayLists:React.FC<PlayListProps> = ({
  playlists
}) => {
    const authModal = useAuthModal();
    const upLoadModal = useUploadPlaylist();
    const {user} = useUser();
    
    const onClick = () =>{
      if(!user){
        return authModal.onOpen()
      }

      return upLoadModal.onOpen()
    }
    if(playlists.length === 0){
      return(
          <div className="
          flex
          flex-col
          gap-y-2
          w-full
          justify-center
          text-neutral-400
          ">
            <div onClick={onClick}>
              <PlayListButton/>
            </div>
            <h1>
              No PlayList
            </h1>

          </div>
      )
  }
  return (
    <div>
        <div 
        onClick={onClick}>
          <PlayListButton/>
        </div>
        <div  
        className='
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-8
          gap-4
          mt-4
        '>
        {playlists.map((playlist)=>(
              <PlaylistItem 
              key={playlist.id}
              data={playlist} 
              onClick={()=>{}}
              />
          ))}
        </div>
    </div>
  )
}

export default PlayLists