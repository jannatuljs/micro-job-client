import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useUser from '../../../Hooks/useUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import coin from '../../../assets/icons/coin.png' 
import buyer from '../../../assets/icons/business-women.png' 

const WorkerHome = () => {

    const axiosSecure = useAxiosSecure()
    const [dbuser] = useUser()

    const { user } = useContext(AuthContext)



    const { data: stats = {}, refetch: statsRefetch } = useQuery({
        queryKey: ['stat'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/workerStats/${dbuser?.email}`)
            return res.data || {}
        }
    })


    const { data: mysubmissions = [], isLoading, refetch } = useQuery({
        queryKey: ['submission'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${dbuser?.email}`)
            return res.data || []
        }
    })

    const approved = Array.isArray(mysubmissions) ? mysubmissions.filter(submission => submission.status == 'approved') : []
  

    return (
        <div className='py-10 w-[92%]  max-w-screen-xl mx-auto'>
            <div className='py-20 border border-white rounded-lg grid md:grid-cols-2 bg-gradient-to-br from-[#cae0ff] to-[#fcc3ff] '>

                <div className='text-center md:border-r-4 border-white'>
                    <img className='rounded-full border my-2 w-60 h-60 mx-auto' src={dbuser?.photo_url} alt="" />
                    <h2 className='text-4xl font-bold'>{dbuser?.name} <span className='text-lg font-medium'>({dbuser?.role})</span> </h2>
                </div>

                <div className='text-xl font-medium my-auto mt-8 md:mt-4'>
                    <h2 className='text-3xl font-bold text-center md:mb-6'>Your Activities</h2>
                    <div className='space-y-2 px-16 md:px-32 py-6 md:py-12'>
                        <p>Total Submission: {stats.submissions}</p>
                        <p>Total pending submission: {stats.pendingSubmissions}</p>
                        <p>Total Earning: {stats.totalPayAmount}</p>

                    </div>
                </div>
            </div>


            <div className='max-w-screen-xl w-[92%] mx-auto bg-white p-12 my-12 rounded'>
                <div className='flex justify-between uppercase'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Approved Tasks: {approved.length}</h2>
                </div>

                <div className="overflow-x-auto rounded-xl my-8">
                    <table className="table table-zebra text-center ">
                        {/* head */}
                        <thead className='bg-gradient-to-r from-[#c3deff] to-[#fac8ff] text-lg uppercase font-medium '>
                            <tr className='h-16'>
                                <th></th>
                                <th>Task</th>
                                <th>Buyer</th>
                                <th>Pay Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {
                                approved?.map((task, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>

                                        <td className='w-[24%] text-start font-medium'>{task.task_title}</td>

                                        <td>
                                            <div className='flex gap-1 items-center justify-center'>
                                                {task.buyer_name}
                                                <img className='w-6 h-6' src={buyer} alt="" />
                                            </div>
                                        </td>

                                        <td >
                                            <div className='flex gap-1 items-center justify-center'>
                                                {task.payable_amount}
                                                <img className='w-6 h-6' src={coin} alt="" />
                                            </div>
                                        </td>



                                        <td>{task.status}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;