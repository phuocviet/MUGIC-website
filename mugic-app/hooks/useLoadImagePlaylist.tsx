import { Playlist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const useLoadImage = (playlist: Playlist) =>{
    const supabase = useSupabaseClient();

    if(!playlist){
        return null;
    };

    const {data: imageData} = supabase
    .storage
    .from('images')
    .getPublicUrl(playlist.image_path)

    return imageData.publicUrl
};

export default useLoadImage;