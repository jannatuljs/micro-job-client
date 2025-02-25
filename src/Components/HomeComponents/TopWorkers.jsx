import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import WorkerCard from '../Shared/WorkerCard';

const TopWorkers = () => {

    const axiosPublic = useAxiosPublic()

    const { data: topWorkers = [] , isLoading, refetch } = useQuery({
        queryKey: ['worker'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topWorkers')
            return res.data
        }
    })

    return (
        <div className='w-[96%] max-w-screen-2xl mx-auto my-24'>
            <div>
                <h1 className='text-center   md:text-2xl lg:text-2xl font-bold'>Top 6 Workers by Coins</h1>
                <p className='hidden md:block ml-52 italic text-gray-500 text-lg text-center font-medium w-[90%] lg:w-[60%] my-4'>These are the top 6 workers based on their available coins. The higher the coin count, the more they are contributing to the project. Keep up the great work! </p>
                <p className='md:hidden text-lg font-medium w-[94%] my-4'>Meet our top-performing workers who have earned the most coins through their hard work and dedication.</p>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-2xl mx-auto my-8 lg:my-14'>
                {
                    topWorkers?.map(worker => <WorkerCard key={worker._id} worker={worker}/>)
                }
            </div>
        </div>
    );
};

export default TopWorkers;