"use client"

import { Song } from "@/types"
import MediaItem from "../Shared/MediaItem";
import LikeButton from "../LikedPlaylist/LikeButton";
import {BsPlayFill, BsPauseFill, BsThreeDots} from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {HiSpeakerXMark, HiSpeakerWave} from "react-icons/hi2"
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import DropBox from "../Shared/DropBox";
import SubBox from "../Shared/SubBox";
import useGetPlaylist from "@/hooks/useGetPlaylist";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


interface PlayerContentProps{
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShowed, setIsShowed] = useState(false);
    const [subIsShowed, setSubIsShowed] = useState(false);
    const [items, setItems] = useState([{title:"", action: ""}]);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave 
    const {playlist, isError} = useGetPlaylist();

    const onPlayNext = () =>{
        if(player.ids.length === 0){
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1];

        if(!nextSong){
            return player.setId(player.ids[0])
        };

        player.setId(nextSong)
    }
    
    const handleDropDown = async () =>{
        // isShowed ? setIsShowed(false) : setIsShowed(true);
        setIsShowed(!isShowed)
        if(isShowed == true){
            setSubIsShowed(false)
        }
        setItems([
            {
                title: "Add to playlist",
                action: "addPlaylist"
            },
            {
                title: "Block this song",
                action: "block"
            }
        ]);
    }

    const onGetValue =() => {
        setSubIsShowed(!subIsShowed)
    }    
    const onPlayPrevious = () =>{
        if(player.ids.length === 0){
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1];

        if(!previousSong){
            return player.setId(player.ids[player.ids.length - 1])
        };

        player.setId(previousSong)
    }

    const [play, {pause, sound}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(()=>{
        sound?.play();
        return () => {
            sound?.unload();
        }
    },[sound]);

    const handlePlay = () => {
        if(!isPlaying){
            play();
        }else{
            pause();
        }
    }

    const toggleMute = () => {
        if(volume === 0){
            setVolume(1);
        }else{
            setVolume(0);
        } 
    }


    return (
    <div
        className="
        relative
        grid
        grid-cols-2
        md:grid-cols-3
        h-full
        "
    >
        <button className="fixed bottom-[90px] left-[10rem] z-50">
            <DropBox isShow={isShowed} items={items} onClick={onGetValue}/>{}
        </button>
        <button className="fixed bottom-[122px] left-[312px] z-50">
            <SubBox isShow={subIsShowed} items={playlist} song={song}/>{}
        </button>
        <div
            className="
            flex
            w-full
            justify-start
            "
        >
            <div className="flex items-center gap-x-4">
                <MediaItem data={song}/>
                <LikeButton songId={song.id}/>
                <div onClick={handleDropDown}>
                    <span 
                        className="text-neutral-400
                        cursor-pointer
                        hover:text-white"
                    >
                        <BsThreeDots size={30}/>
                    </span>
            </div>
            </div>
        </div>

        <div
        className="
        flex
        md:hidden
        cols-auto
        w-full
        justify-end
        items-center  
        "
        >
            <div 
            onClick={handlePlay}
            className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
            "
            >
                <svg className="text-black">
                   <Icon size={30}/> 
                </svg>
            </div>
        </div>

        <div
        className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
        gap-x-6
        "
        >
            <span
            onClick={onPlayPrevious}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
            >
                <AiFillStepBackward size={30}/>
            </span>
            <div 
            onClick={handlePlay}
            className="
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white
            text-black
            p-1
            cursor-pointer
            "
            >
                <Icon size={30}/>
            </div>
            <span
                onClick={onPlayNext}
                className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
            >
                <AiFillStepForward size={30}/>
            </span>
        </div> 

        <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
                <span 
                onClick={toggleMute} 
                className="cursor-pointer"
                >
                    <VolumeIcon size={34}/>
                </span>
                <Slider
                value={volume}
                onChange={(value)=> setVolume(value)}
                />
            </div>
        </div>   
    </div>
  )
}

export default PlayerContent