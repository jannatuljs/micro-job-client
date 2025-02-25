import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Components/HomeComponents/Banner';
import TopWorkers from '../Components/HomeComponents/TopWorkers';
import Featured from '../Components/HomeComponents/Featured';
import QnA from '../Components/HomeComponents/QnA';
import OurPartners from '../Components/HomeComponents/OurPartners';
 
const Home = () => {
    return (
        <div className='min-h-[calc(100vh-376px)]'>
            <Helmet>
                <title>Earning Platform </title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Banner/>
             
            <TopWorkers/>
            <Featured/>
            <QnA/>
            <OurPartners/>
           

        </div>
    );
};

export default Home;