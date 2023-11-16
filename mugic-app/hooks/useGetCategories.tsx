import useSWR from 'swr';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { useMemo } from 'react';

export default function useGetCategories() {
  const { supabaseClient: supabase } = useSessionContext();
  
  const { data, error } = useSWR('categories', async () => {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      

    if (error) {
      toast.error(error.message);
      throw error;}
    return categories;
  });

  return useMemo(()=>({
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }),[data, error])
  
}
