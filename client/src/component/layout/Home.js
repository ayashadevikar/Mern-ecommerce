import React from 'react';
// import { Mouse } from "react-icons";
import Product from './Product.js';
import MetaData from './MetaData.js';

const product = {
     name: "Blue TShirt",
     images: [{ url: "https://i.ibb.co/DRST11n/1.webp"}],
     price: "Rs.3000",
     _id: "robrt",
}

const Home = () => {
  return (
    <>

<MetaData title="ECOMMERCE" />
        <div className="banner flex flex-col gap-y-8 justify-center items-center h-[100vmin] text-white bg-gradient-to-r from-cyan-500 to-blue-500">
            <p className="text-xl">Welcome to Ecommerce</p>
            <h1 className="text-2xl font-bold">FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button className="border px-8 py-2 rounded-xl">
                  Scroll  {/* <Mouse /> */}
              </button>
            </a>
          </div>

          <h2 className="homeHeading text-center text-xl border-b-2 solid to-black w-30">Featured Products</h2>
   
          <div className="container flex m-[2vmax] m-auto w-[80vw] flex-wrap justify-center" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
              
          </div>
   
    </>
  )
}

export default Home
