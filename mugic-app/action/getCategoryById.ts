import { Category, Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



const getCategoryById
 = async (id: string): Promise<Category> =>{
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error} = await supabase
    .from('categories')
    .select('*')
    .eq('id',id)
    .order('created_at',{ascending: false})
    .single()

    if(error){
        console.log(error);
    }

    return (data as any) || "";
}

export default getCategoryById;