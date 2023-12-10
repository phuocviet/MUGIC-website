"use client"

import { useEffect, useState } from "react"
import AuthModal from "@/components/PopupModal/AuthModal";
import UploadSongModal from "@/components/PopupModal/UploadSongModal";
import UploadPlayListModal from "@/components/PopupModal/UploadPlayListModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[]);

    if(!isMounted){
        return null;
    }
    
  return (
    <>
      <AuthModal/>
      <UploadSongModal/>
      <UploadPlayListModal/>
    </>
  )
}

export default ModalProvider