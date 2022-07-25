import React from 'react'
import { gql } from '@apollo/client/core'

const ALL_ANIME = gql `
    query AllAnime($page: Int, $perpage: Int){	
        Page(page: $page, perPage: $perpage){
            media(type: ANIME, sort: TRENDING_DESC){
                id
                title{
                romaji
                }
                coverImage{
                large
                }
                description
                trending
                startDate {
                    year
                    month
                    day
                }
                averageScore
            }
        }
    }
`

export default ALL_ANIME