import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ALL_ANIME from '../../lib/queries/AllAnime'

const FavoriteMovie = () => {
    const navigate = useNavigate()
    const {loading, error, data} = useQuery(ALL_ANIME, {
        variables: {
            page: 1,
            perpage: 16,
        }
    })

    const handleBack = ()=>{
        navigate('/')
    }
    let count = 0
    const [animeFav, setAnimeFav] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [])

    const FavMov = (animeId)=>{
        if(animeFav.length > 0){
            return(
                <div>
                {
                    data.Page.media.filter((e)=>e.id == animeId.value).map((anime, i)=>(
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
                    ))
                }
                </div>
            )}
    }

    if(loading) return <h1 className='text-5xl text-indigo-700'>Loading...</h1> 
    else{
    if(animeFav.length == 0){
        return(
           <div>
            <h1 className='text-indigo-700 text-xl'>No Data Found</h1>
            <button
                    onClick={handleBack}
                    type="button"
                    className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
            >
                Back
            </button>
           </div>
           
        )
    }
    
    return (
        <div>
            <button
                    onClick={handleBack}
                    type="button"
                    className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
            >
                Back
            </button>
            <ul role="list" className="flex flex-wrap justify-center gap-14 mt-5 mb-5">
            {animeFav.map((animeId, i)  => (
                
                     <FavMov value = {animeId}/>
               
            ))}
    </ul>
        </div>
    )}
}

export default FavoriteMovie