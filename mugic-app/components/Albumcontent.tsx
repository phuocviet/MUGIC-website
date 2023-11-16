import { Song } from "@/types"

interface AlbumcontentProps {
    songs: Song[]
}

const Albumcontent: React.FC<AlbumcontentProps> = ({
    songs
}) => {
    const album = ()=> {
        return (
            <div className="h-40 w-40 bg-neutral-600 flex justify-center items-center rounded-md">

            </div>
        );
    }
    
  return (
    <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
    ">

    </div>
  )
}

export default Albumcontent