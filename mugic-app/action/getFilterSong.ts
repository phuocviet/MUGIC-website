import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


const getFilterSongs = async (categoryId: string): Promise<Song[]> =>{
    
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data } = await supabase
    .from('songs')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at',{ascending: false})


    if(!data) return[];
    

    return data.map((item)=>({
        ...item.songs
    }))
}

export default getFilterSongs;