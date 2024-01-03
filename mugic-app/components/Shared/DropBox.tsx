"use client"

interface DropBoxProps{
    isShow: boolean;
    items: { title: string; action: string; }[]
    onClick: () => void
}

const DropBox: React.FC<DropBoxProps> = ({
    isShow,
    items,
    onClick
}) => {

  if(isShow){
  return (
    <div 
    className="
    flex 
    flex-col
    row-auto 
    text-center
    bg-black
    rounded-md  
    pt-2
    pb-2
    w-[150px]
    ">
      {items?.map((item, index)=>(
        <div 
        key={index} 
        className="cursor-pointer hover:text-gray-400 transition rounded-lg"
        onClick={onClick}
        >
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
  }
  return ;
}


export default DropBox;