import React from 'react'

const Card = ({children, ...attr}) => {
  return (
    <div className='bg-indigo-800 text-white max-w-sm mb-10 items-center' {...attr}>
      {children}
    </div>
  )
}

const CardImage = ({src, ...attr})=>{
  return(
    <img src={src} alt="" {...attr} className="place-items-center"/>
  )
}

const CardDetail = ({children})=>{
  return(
    <div className='items-center'>
      {children}     
    </div>
  )
}

export default Card
export {CardImage}
export {CardDetail}