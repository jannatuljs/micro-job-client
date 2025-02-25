import React from 'react';
import lottierror from '../assets/Error/404.json'
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

const ErrorPage = () => {
    return (
        <div className='h-screen bg-gradient-to-r from-[#ecf5ff] to-[#fef1ff]'>
            <div className='text-center h-fit '>
                <Lottie
                    className='w-[600px] mx-auto'
                    height={400}
                    width={400} 
                    animationData={lottierror}
                    loop={true} />
                <p className='w-1/2 mx-auto mb-14 -mt-32 text-lg font-medium'>
                The page you're looking for seems to have wandered off. It might have been moved, deleted, or never existed in the first place. Don't worry—let's get you back on track! Head back to where you came from or use the navigation to find what you need.
                </p>
                <div className=''>
                    <Link to={-1} className='p-2 px-4 hover:p-3 hover:px-5 border border-white bg-gradient-to-r from-[#a9cffc] to-[#fac8ff] rounded-md mx-auto items-center font-medium text-xl'>Go Back</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;