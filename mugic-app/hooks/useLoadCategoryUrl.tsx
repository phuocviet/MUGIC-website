import { Category } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (categories: Category) =>{
    const supabaseClient = useSupabaseClient();

    if(!categories){
        return '';
    }

    const {data: songData} = supabaseClient
    .storage
    .from('categories')
    .getPublicUrl(categories.title)

    return songData.publicUrl;
}

export default useLoadSong;