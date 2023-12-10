import { Playlist } from '@/types'
import React from 'react'
import PlayListContent from './Playlistcontent';
import PlayListButton from './PlayListButton';

interface PlayListProps{
    playlists: Playlist[];
}

const PlayLists:React.FC<PlayListProps> = ({playlists}) => {
  return (
    <div>
        <div>
            <PlayListButton/>
        </div>
        <div>
            <PlayListContent songs={[]}/>
        </div>
        
    </div>
  )
}

export default PlayLists