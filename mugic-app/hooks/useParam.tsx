import useSWR from 'swr';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';


export default function useParam() {
  const param = useParams();
  


  return useMemo(()=>({
    param
  }),[param])
  
}
