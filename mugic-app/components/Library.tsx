"use client"

import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPLay'

interface LibraryProps{
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
    const authModal = useAuthModal();
    const upLoadModal = useUploadModal();
    const {user} = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () =>{
      if(!user){
        return authModal.onOpen()
      }

      return upLoadModal.onOpen()
    }
  return (
    <div className="flex flex-col">
      <div className="
      flex
      items-center
      justify-between
      px-5
      pt-4
      ">
        <div className="
        inline-flex
        items-center
        gap-x-2
        ">
          <span className='text-neutral-400'>
            <TbPlaylist 
            size={26}
            />
          </span>
            <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>
        <button 
          onClick={onClick} 
          className = 'text-neutral-400 cursor-pointer hover:text-white transition'
          >
          <AiOutlinePlus
            size={20}/>{}
        </button>
        
      </div>
      <div className='
      flex
      flex-col
      gap-y-2
      mt-4
      px-3
      '>
        {songs.map((song)=>(
          <MediaItem 
          onClick={(id: string)=>onPlay(id)}
          data={song}
          key={song.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
