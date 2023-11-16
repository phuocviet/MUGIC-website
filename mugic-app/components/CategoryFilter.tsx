"use client"

import React from 'react'
import CategoryCard from './CategoryCard'
import useGetCategories from '@/hooks/useGetCategories';

const CategoryFilter = () => {
  const {categories} = useGetCategories();

  
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
                value={c.title}  
              />
          ))
      }
    </div>
  )
}

export default CategoryFilter