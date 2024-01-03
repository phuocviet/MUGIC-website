"use client"

import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { MdDelete } from "react-icons/md"

interface DeleteButtonProps{
    songId: any
}

const DeleteButton:React.FC<DeleteButtonProps> = ({songId}) => {
    const router = useRouter();
    const {supabaseClient} = useSessionContext();

    const {user} = useUser();
    const handleDelete = async () => {
        const {error} = await supabaseClient
        .from('playlist_songs')
        .delete()        
        .eq('user_id',user?.id)
        .eq('song_id',songId)
        if(error){
            toast.error(error.message);
        }else{
            toast.success('Deleted');
        }
        router.refresh();
    }
    return (
        <button 
        onClick={handleDelete}
        className="
            cursor-pointer
            hover:opacity-75
            transition
        ">
            <MdDelete size={25}/>{}
        </button>
      )
}

export default DeleteButton