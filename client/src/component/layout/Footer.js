import React from 'react';
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";

const Footer = () => {
  return (
    <div className='footer flex justify-around items-center mt-20 p-4 bg-zinc-800 text-white'>
       
       <div className="leftFooter flex flex-col gap-y-4 items-center">
        <h4 className='text-2xl'>DOWNLOAD OUR APP</h4>
        <p className='w-80 text-center'>Download App for Android and IOS mobile phone</p>
           <div className='flex flex-col gap-y-4'>
             <img className='w-40 h-30' src={playStore} alt="playstore" />
             <img className='w-40 h-30' src={appStore} alt="Appstore" />
           </div>
      </div>

      <div className="midFooter flex flex-col items-center gap-y-4">
        <h1 className='text-2xl text-rose-500'>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter flex flex-col items-center gap-y-1">
        <h4 className='text-2xl underline'>Follow Us</h4>
        <a  className="  transition: all 0.5s" href="http://instagram.com/meabhisingh">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </div>
  )
}

export default Footer
