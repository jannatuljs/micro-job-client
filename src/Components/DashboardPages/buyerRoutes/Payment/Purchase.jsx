import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import coin from '../../../../assets/icons/coin.png'
import { Link } from 'react-router-dom';

const Purchase = () => {

    const axiosSecure = useAxiosSecure()

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['pack'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages')
            return res.data || []
        }
    })
        
    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }


    return (
        <div className='py-24 min-h-[calc(100vh-350px)] max-w-screen-xl w-[94%] mx-auto'>
            <div className='grid gap-12 md:grid-cols-2'>
                {
                    Array.isArray(packages) ?
                        packages.map((pack, index) =>
                            <div key={index} className='w-[90%] mx-auto text-center border-2 border-white rounded-xl bg-white flex flex-col'>
                                <div className='bg-gradient-to-br from-[#bedaff] to-[#f9adfe] rounded-xl rounded-b-none'>
                                    <h2 className='text-3xl font-bold py-4'>{pack.category}</h2>
                                </div>
                                <Link to={`/dashboard/purchase/${pack._id}`} className='py-14 '>
                                    <h2 className='text-5xl font-medium flex gap-1 justify-center items-center'>
                                        {pack.coins}
                                        <img className='w-12 h-12' src={coin} alt="" />
                                    </h2>
                                    <p className='text-2xl py-3'>For only <span className='font-medium'> {pack.pay_amount}$</span></p>
                                </Link>
                            </div>
                        )
                        :
                        []
                }
            </div>
        </div>
    );
};

export default Purchase;