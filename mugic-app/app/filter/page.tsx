import getCategories from "@/action/getCategories";
import getCategoryById from "@/action/getCategoryById";
import getFilterSongs from "@/action/getFilterSong";
import getSongs from "@/action/getSong";
import CategoryTitle from "@/components/Category/CategoryTitle";
import FilteredSong from "@/components/Category/FilteredContent";
import Header from "@/components/Shared/Header";
import React from "react";


export const revalidate = 0;


const Filter = async () => {
  
  const songs = await getSongs();
  const category = await getCategories();
  
  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header>
        <div className="mt-20">
          <div className="
          flex
          flex-col
          md:flex-row
          items-center
          gap-x-5
          ">
            <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            md:mt-0
            ">
              <p className="hidden md:block font-semibold text-sm">
                PlayList
              </p>
              <CategoryTitle category={category}/>
            </div>
          </div>
        </div>
      </Header>
      <FilteredSong songs={songs}/>
    </div>
  )
}

export default Filter