import React, { createContext, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import FavoriteMovie from './pages/FavoriteMovie/FavoriteMovie'

const GetData = createContext()

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  });

  const [getDatas, setDatas] = useState([])

  return (
    <div>
        <ApolloProvider client={client}>
          <GetData.Provider value = {[getDatas, setDatas]}>
            <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path = '/MovieDetail/:id' element = {<MovieDetail/>}/>
              <Route path = '/FavoriteMovie' element = {<FavoriteMovie/>}/>
            </Routes>
          </GetData.Provider>
        </ApolloProvider>
    </div>
  );
}

export default App;
export {GetData}