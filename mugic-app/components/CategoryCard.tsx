"use client"

import { FC } from "react";

interface Category {
  id: string;
  title: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

const CategoryCard:FC<CategoryCardProps> = ({
    onClick,
    category
}) => {    
  const handleClick = () => {
    onClick(category.id)
  }
  return (
    <div
    className="
    sm:w-[100px]
    md:w-[100px]
    lg:w-[150px]
    xl:w-[150px] 
    2xl:w-[180px]
    h-[30px] 
    hover:bg-blue-500 
    bg-blue-500/50
    transition
    rounded-md 
    flex 
    justify-center 
    items-center 
    cursor-pointer"
    onClick={handleClick}
    >
        <div>
          <p className="text-white">{category.title}</p>
        </div>   
    </div>
  )
}

export default CategoryCard