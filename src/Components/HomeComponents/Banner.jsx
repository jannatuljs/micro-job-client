import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/image/img-1.webp';
import img2 from '../../assets/image/img-2.jpg';
import img3 from '../../assets/image/img-3.jpeg';
import img4 from '../../assets/image/img-4.jpg';
import img5 from '../../assets/image/img-5.jpg';
import '../../App.css'

const Banner = () => {
   return (
        <div className="carousel-container" >
           <Carousel>
       
       <div >
       <img src=  {img1} />
       <h3 className='text-5xl  text-blue-800  font-bold -mt-60'>How to Start <span className='text-pink-200'>Doing Micro Jobs?</span></h3>
           <p className='text-white'>What Are Micro Tasks? How to Earn Money Doing Micro <br/>Tasks?Micro-tasks provide the opportunity </p> 
       </div>
       <div >
       <img src=  {img2} />
            
       </div>
        
       <div>
       <img src= {img3} />
       <h3 className='text-3xl   font-bold -mt-52'>Earn With Micro Jobs: Guide For Making Side Income</h3>
         <p className='text-slate-700 mt-3'>Micro Jobs allows you to become an independent contractor  
           for temporary work, that is usually small and simple.<br/> As remote work gets more attention,  it drives more popularity towards micro jobs regularly.</p>   
       </div>
       <div>
       <img src={img4} />
         
         <h3 className='text-3xl text-white font-bold -mt-72'>Find the Best Micro Jobs in Our Marketplace.</h3>   
       <p className='text-white'>You can earn money by completing micro jobs that start right away -<br/> Your one way to work from home and start earning</p>
       </div>
       <div className="">
        <img src={img5}  alt=''/>
       </div>
       
   </Carousel>
        </div>
   );
};

export default Banner;