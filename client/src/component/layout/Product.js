import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: "2.5",
    isHalf: "true",
};

const Product = ({ product }) => {
  return (
      <Link className='productCard flex flex-col w-40 m-2 pb-2' to={product._id}>
           <img className="w-40" src={product.images[0].url}  alt={product.name} />
           <p className='text-xl'>{product.name}</p>
           <div className='flex justify-start m-2'>
               <ReactStars {...options} />  <span  className='m-2'> (256 Reviews) </span>
           </div>
           <span className='m-2 text-red-500'>{product.price}</span>
       </Link>
  )
}

export default Product
