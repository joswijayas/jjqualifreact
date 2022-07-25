import React, { useState } from 'react'
import ALL_ANIME from '../../lib/queries/AllAnime'
import { useQuery } from '@apollo/client/react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
const MovieDetail = () => {
    const {loading, error, data} = useQuery(ALL_ANIME, {
        variables: {
            page: 1,
            perpage: 16,
        }
    })

    const navigate = useNavigate()

    const {id} = useParams('')
    const handleBack = ()=>{
        navigate('/')
    }
    let count = 0

    const [animeFav, setAnimeFav] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [])

    const handleAnimeFav = (id) =>{
        let animeArr = [...animeFav]
        animeArr.push(id)
        localStorage.setItem('favorites', JSON.stringify(animeArr))
        setAnimeFav(animeArr)
    }

    const handleAnimeUnfav = (id) =>{
        let animeArr = [...animeFav]
        animeArr.splice(animeArr.indexOf(id), 1)
        localStorage.setItem('favorites', JSON.stringify(animeArr))
        setAnimeFav(animeArr)
    }

    const [favoriteSign, setFavoriteSign] = useState(false)
    const FavoriteButton = (id)=>{
        let animeArr = [...animeFav]
        if(animeArr.indexOf(id.id)>-1){
            return(
                <svg onClick={()=>{setFavoriteSign(!favoriteSign); handleAnimeUnfav(id.id)}} className="cursor-pointer h-6 w-6 text-fuchsia-700 fill-fuchsia-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        }else{
            return (
                <svg onClick={()=>{setFavoriteSign(!favoriteSign); handleAnimeFav(id.id)}} className="cursor-pointer h-6 w-6 text-fuchsia-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        }
    }

    if(loading) return <h1 className='text-5xl text-indigo-700'>Loading...</h1>
    else{
    return (
        <div>
            <button
                onClick={handleBack}
                  type="button"
                  className=" w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
            >
                  Back
            </button>
        <ul role="list" className="flex flex-wrap justify-center gap-14 mt-5">
            
            {data.Page.media.filter((e)=>e.id == id).map((anime, i)  => (
                        <li key={count++} className="relative w-70 ml-10 mr-10 flex flex-col items-center">
                        <div className="group block w-56  aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                            <img src={anime.coverImage.large} alt="" className="object-cover pointer-events-none group-hover:opacity-75 " />     
                        </div>

                        {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{anime.id}</p> */}
                        <p className="mt-2 block text-sm font-medium break-words text-indigo-700 pointer-events-none">{anime.title.romaji}</p>
                         
                         <FavoriteButton id={anime.id}/>

                        <span className="mt-5 flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                           Current trending: {anime.trending}
                        </span>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                           Release Date: {anime.startDate.year} - {anime.startDate.month} - {anime.startDate.day}
                        </span>
                        <p className="mt-5 text-justify block text-sm font-medium text-gray-500 pointer-events-none">{anime.description}</p>
                        </li>
            ))}
            </ul>
            </div>
    )}
}

export default MovieDetail