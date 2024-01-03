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
    hover:bg-neutral-400/5 
    rounded-md 
    flex 
    justify-center 
    items-center 
    cursor-pointer"
    onClick={handleClick}
    >
        <div>
          <p className="text-sky-200 hover:text-white transition semi-bold">{category.title}</p>
        </div>   
    </div>
  )
}

export default CategoryCard