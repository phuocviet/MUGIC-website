import getSongs from '@/action/getSong';
import Header from '@/components/Shared/Header'
import ListItem from '@/components/Shared/ListItem'
import PageContent from '@/components/MainContents/PageContent';
import PlayLists from '@/components/PlayList/PlayLists';
import CategoryFilter from '@/components/Category/CategoryFilter';
import getCategories from '@/action/getCategories';
import getPlayLists from '@/action/getPlayList';
import PlaylistModal from '@/components/PopupModal/PlaylistModal';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const categories = await getCategories();
  const playlists = await getPlayLists();
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
        <div className='mb-2'>
          <h1 className='
          text-white
          text-3xl
          font-semibold
          '>
            Welcome back
          </h1>
          <div className='
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          '>
            <ListItem 
              image='/images/liked.png'
              name='Liked Songs'
              href='Liked'
            />
          </div>
        </div>
      </Header>
      {/* <PlaylistModal/> */}
      <div className='mt-2 mb-7 px-6'>
        
        <div>
          <CategoryFilter categories={categories}/>
        </div>
      </div>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          {/* <h1 className='text-white text-2xl font-semibold'>
            Newest Songs
          </h1> */}
        </div>
        <div>
          <PageContent songs={songs}/>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-white text-2xl font-semibold'>
            PlayList
          </h1>
        </div>
        <div>
          <PlayLists playlists={playlists}/>
        </div>
      </div>
      
    </div>
  )
}
