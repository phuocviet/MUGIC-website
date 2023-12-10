"use client"
import qs from 'query-string'
import React from 'react'
import CategoryCard from './CategoryCard'
import useGetCategories from '@/hooks/useGetCategories';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

interface CategoryFilterProps{
  categories: Category[]
}

const CategoryFilter :React.FC<CategoryFilterProps> = ({
  categories
}) => {
  
  const router = useRouter();
  
  const handleNavigate = (categoryId: string) => {
    const url = qs.stringifyUrl({
      url: `/Filter`,
      query: {categoryId}
    });
    router.push(url);
  }
  return (
    <div
      className='
      grid
      grid-cols-2
      sm:grid-cols-2
      m:grid-cols-4
      l:grid-cols-5
      xl:grid-cols-6
      2xl:grid-cols-6
      gap-4
      mt-4
      overflow-y-hidden
      '
    >
      {
          categories?.map((c)=>(
              <CategoryCard 
                key={c.id}
                category={c}  
                onClick={handleNavigate}
              />
          ))
      }
    </div>
  )
}

export default CategoryFilter