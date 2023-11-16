"use client"

import { FC, ReactNode } from "react";

interface CategoryCardProps {
  value: string
}
const CategoryCard:FC<CategoryCardProps> = (
    value
) => {    
  const title = value;
  return (
    <div
    className="
    w-[200px] 
    h-[50px] 
    hover:bg-neutral-800/50 
    bg-neutral-800  
    rounded-md 
    flex 
    justify-center 
    items-center 
    cursor-pointer"
    >
        <div className="">
            <input type="submit" value={title.value}/>
        </div>   
    </div>
  )
}

export default CategoryCard