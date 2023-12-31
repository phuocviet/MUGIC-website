import getSongByTitle from "@/action/getSongByTitle";
import Header from "@/components/Shared/Header";
import SearchContent from "@/components/SearchBar/SearchContent";
import SearchInput from "@/components/SearchBar/SearchInput";

interface SearchProps{
    searchParams:{
        title:string;
    }
};

export const revalidate = 0;

const Search = async ({searchParams}:SearchProps) => {
    const songs = await getSongByTitle(searchParams.title);
  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header className="from-bg-neutral-900">
        <h1 className="text-white text-3xl font-semibold">
          Search
        </h1>
        <SearchInput/>
      </Header>
      <SearchContent songs={songs}/>
    </div>
  )
}

export default Search