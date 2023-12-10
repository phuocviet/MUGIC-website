import { BiPlus } from "react-icons/bi"
import Button from "../Shared/Button"


const PlayListButton = () => {
  return (
    <div>
      <button 
      className="relative 
      group 
      flex 
      flex-col 
      items-center 
      justify-center 
      rounded-md 
      overflow-hidden 
      gap-x-4 
      bg-neutral-400/5 
      cursor-pointer 
      hover:bg-neutral-400/10 
      transition 
      p-3"
      >
        <span 
          className="relative 
            aspect-square 
            w-full
            h-full 
            rounded-md 
            overflow-hidden">
          <BiPlus size={20}/> {}
        </span>
      </button>
    </div>
  )
}

export default PlayListButton