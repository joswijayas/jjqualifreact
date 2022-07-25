import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import ALL_ANIME from '../../lib/queries/AllAnime'
import Card, {CardImage, CardDetail} from '../../components/Card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { GetData } from '../../App'
const Home = () => {
  const {loading, error, data} = useQuery(ALL_ANIME, {
    variables: {
        page: 1,
        perpage: 16,
    }
  })
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  // const getDatass = useContext(GetData)
  if(loading) return <h1 className='text-5xl text-indigo-700'>Loading...</h1> 
  else if(!loading) {

  let count = 0

  const handleFavoriteBoard = ()=>{
    navigate('/FavoriteMovie')
  }
    
  return (
    // <div className='items-center max-w-sm'>
    //         {data.Page.media.map((anime, i) => (
    //           <a href="" className='m-b-10 max-w-sm items-center'> 
    //             <Card>
    //               {<CardImage src={anime.coverImage.large}/>}               
    //               {<CardDetail children={anime.title.romaji}/>}
    //             </Card>
    //           </a>
    //         ))}
    // </div>
    <div>
       <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <div className="w-full">
            <label for="search" className="sr-only text-white">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input onChange={(e)=>{setSearchValue(e.target.value)}} id="search" name="search" className="bg-violet-700 block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-white focus:outline-none focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search" type="search"/>
            </div>
          </div>
        </div>
      </div>
     
      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <div className="w-full">
            <label for="search" className="sr-only text-white">Search</label>
            <div className="relative">
              
              <button onClick={handleFavoriteBoard} type="button" class="w-full inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                 Your Favorite Movies
              </button>
            </div>
          </div>
        </div>
      </div>
    <ul role="list" className="flex flex-wrap justify-center gap-14 mt-5 mb-5">
      {data.Page.media.filter((e)=>e.title.romaji.toLowerCase().indexOf(searchValue.toLowerCase())>-1).map((anime, i)  => (
        <Link to={`/MovieDetail/${anime.id}`}>
          <a href="">
            <li key={count++} className="relative w-56 flex flex-col items-center">
              <div className="group block w-56  aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src={anime.coverImage.large} alt="" className="object-cover pointer-events-none group-hover:opacity-75 " />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only break-words text-indigo-700">View details for {anime.title.romaji}</span>
                </button>
              </div>
              {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{anime.id}</p> */}
              <p className="mt-2 block text-sm font-medium break-words text-indigo-700 pointer-events-none">{anime.title.romaji}</p>
              <p className="rounded bg-yellow-300 block text-sm font-medium text-gray-500 pointer-events-none">User rate: {anime.averageScore}</p>
            </li>
          </a>
        </Link>
      ))}
    </ul>
    </div>
  )}
}

export default Home