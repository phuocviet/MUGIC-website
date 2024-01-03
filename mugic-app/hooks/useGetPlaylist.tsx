import useSWR from 'swr';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { useMemo } from 'react';

export default function useGetPlaylist() {
  const { supabaseClient: supabase } = useSessionContext();
  
  const { data, error } = useSWR('categories', async () => {
    const { data: categories, error } = await supabase
      .from('playlist')
      .select('*')
      

    if (error) {
      toast.error(error.message);
      throw error;}
    return categories;
  });

  return useMemo(()=>({
    playlist: data,
    isLoading: !error && !data,
    isError: error,
  }),[data, error])
  
}
