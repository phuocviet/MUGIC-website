"use client"

import useGetCategories from "@/hooks/useGetCategories";
import { Category } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface CategoryTitleProps{
  category: Category[]
}

const CategoryTitle:React.FC<CategoryTitleProps> = ({category}) => {
    
    const param = useSearchParams();
    const id = param.get('categoryId')
    const categoryTitle = category?.filter(x => x.id == id);
    
  return (
    <h1 
              className="
              text-white
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-bold
              "
              >
              {categoryTitle[0].title} Songs
    </h1>
  )
}

export default CategoryTitle