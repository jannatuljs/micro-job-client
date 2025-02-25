import React from 'react';
import { BiCheck } from "react-icons/bi";
const Featured = () => {
   return (
       <div className='grid grid-cols-2 gap-2'>
   <div className="grid grid-cols-2" >
       <img className='' src='https://st3.depositphotos.com/1700950/12890/i/450/depositphotos_128909674-stock-photo-handshake-while-job-interviewing.jpg' alt=''/>
   <img className='pt-4 h-40 ' src='https://www.infinityjobs.in/images/jobq.jpg'  alt=''/>
   <img className='ml-4 ' src='https://st3.depositphotos.com/9881890/15124/i/450/depositphotos_151249426-stock-photo-businessmen-at-job-interview.jpg'  alt=''/>
   <img className='ml-4 mt-4 '  src='https://img2.exportersindia.com/product_images/bc-full/2020/11/8201135/job-placement-1606160301-5639102.jpg'  alt=''/>
   </div>
       <div className=" ml-16">
           <h2 className='text-2xl font-bold '>We Help To Get The Best Job<br/>
           And Find A Talent</h2>
           <p className='mt-5 mb-4 text-gray-600'>Whether you're a student, stay-at-home parent, or just looking to make some extra cash,  [Your Website Name]<br/> is the place for you! </p>
           <span className='flex font-semibold mb-1'> <BiCheck className='size-6'/>Create a free account and start browsing available jobs.</span>
           <span className='flex font-semibold mb-1'> <BiCheck className='size-6'/>Find tasks that match your skills and interests.
           </span>
           <span className='flex font-semibold mb-1'> <BiCheck className='size-6'/>Choose jobs based on your skills and availability.</span>
       

       <p className='text-center items-center mt-4  bg-slate-400 text-lg font-semibold btn'>Read More</p>
       </div>
    
       </div>
   );
};

export default Featured;
