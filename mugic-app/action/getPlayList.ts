import { Playlist } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getPlayLists = async (): Promise<Playlist[]> =>{
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        },
    } = await supabase.auth.getSession();

    const { data } = await supabase
    .from('playlist')
    .select('*')
    .eq('user_id',session?.user?.id)
    .order('created_at',{ascending: false})


    if(!data) return[];
    

    return (data as any) || [];
}

export default getPlayLists;