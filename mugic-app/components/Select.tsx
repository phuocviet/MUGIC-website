"use client"

import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import useGetCategories from "@/hooks/useGetCategories"
import toast from "react-hot-toast"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}
  
  const Select = forwardRef<HTMLSelectElement, SelectProps>(({
      className,
      disabled,
      onSelect,
      ...props
  }, ref) => {
      const { categories, isLoading, isError } = useGetCategories();
      if(isError){
        isLoading
        toast.error("Something wrong")
      }
  
      return (
          <select
                onSelect={onSelect}
              className={twMerge(
                  `
                  flex 
                  w-full 
                  rounded-md 
                  bg-neutral-700
                  border
                  border-transparent
                  px-3 
                  py-3 
                  text-sm 
                  file:border-0 
                  file:bg-transparent 
                  file:text-sm 
                  file:font-medium 
                  placeholder:text-neutral-400 
                  disabled:cursor-not-allowed 
                  disabled:opacity-50
                  focus:outline-none
                `,
                  disabled && 'opacity-75',
                  className
              )}
              disabled={isLoading}
              ref={ref}
              {...props}
          >
              <option disabled hidden value="">Select category</option>
              {categories?.map((c) => (
                  <option
                      className="flex flex-col fixed"
                      key={c.id}
                      value={c.id}
                  >
                      {c.title}
                  </option>
              ))}
          </select>
      )
  })
  
  Select.displayName = "Select"
  
  export default Select
  