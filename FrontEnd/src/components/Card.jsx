import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({item,idx}) => {
  console.log(item._id);
  return (
    <>
    <Link to={`/cardfood/${item._id}`} key={idx} className='flex flex-col items-center justify-center gap-2 cursor-pointer min-w-[11rem]'>
    <img className="rounded-full aspect-square size-[9rem]" src={item.image} alt="product image" />
   
    <p className="text-gray-700 font-medium text-lg text-ellipsis line-clamp-1 text-center">{`${item.name}`}</p>
</Link>
  
    </>
  )
}

export default Card