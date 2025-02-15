import React from 'react'
import { Link } from 'react-router-dom'
const FoodItemCard = ({item}) => {
  return (
    
    <Link to={`/food/${item._id}`} className='flex flex-col items-center justify-center gap-2  cursor-pointer min-w-[11rem] w-full  overflow-hidden mt-2 hover:scale-[1.02] transition-all duration-300 '>
    <img className="w-full aspect-video object-cover rounded-lg " src={item.image} alt="product image" />
    <div>
    <p className='font-medium text-xl mt-1 text-ellipsis line-clamp-1 text-center'>{item.name}, &#8377; {item.price}</p>
    <p className=' text-gray-500 text-ellipsis line-clamp-1 text-center'>{item.description}</p>
    </div>
    </Link>
  )
}   

export default FoodItemCard