import React, { useState } from 'react';
import useUser from '../../../Hooks/useUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import coin from '../../../assets/icons/coin.png'
import worker from '../../../assets/icons/employee.png'
import { MdDoneOutline } from "react-icons/md";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { format } from 'date-fns';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';
import { motion } from 'motion/react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BuyerHome = () => {

    const [dbuser] = useUser()
    const axiosSecure = useAxiosSecure()
    const [showModal, setShowmodal] = useState(false)
    const [selected, setSelected] = useState()


    const { data: stats = {}, refetch: statrefetch } = useQuery({
        queryKey: ['stat'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyerStats/${dbuser?.email}`)
            return res.data || {}
        }
    })

    const { data: submissions = [], isLoading, refetch } = useQuery({
        queryKey: ['submission'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submission/${dbuser?.email}`)
            return res.data || []
        }
    })

    const pendings = Array.isArray(submissions) ? submissions.filter(submission => submission?.status == 'pending') : []

    const handleModal = (task) => {
        setSelected(task)
        setShowmodal(true)
    }

    const closeModal = () => {
        setShowmodal(false);
        setSelected(null);
    };

    const handleApproved = (task) => {
        Swal.fire({
            title: "Do you want to approve this submission?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8cbefa",

            confirmButtonText: "Yes, approve!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/submit/${task._id}`)
                    .then(res => {

                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Approved!",
                                text: "This submission has been approved.",
                                icon: "success"
                            });
                            const notification = {
                                message: `You have earned ${task.payable_amount} from ${task.buyer_email} for completing ${task.task_title}`,
                                ToEmail: task.worker_email,
                                Time: new Date(),
                            }
                            axiosSecure.post('/notifications', notification)
                                .then(res => {  })
                            refetch()
                        }
                    })
            }
        });
    }

    const handleReject = (task) => {
        Swal.fire({
            title: "Do you want to reject this submission?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8cbefa",

            confirmButtonText: "Yes, reject!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/submitR/${task._id}`)
                    .then(res => {

                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Rejected!",
                                text: "This submission has been rejected.",
                                icon: "success"
                            });
                            const notification = {
                                message: `${task.buyer_email} rejected your submission for ${task.task_title}`,
                                ToEmail: task.worker_email,
                                Time: new Date(),
                            }
                            axiosSecure.post('/notifications', notification)
                                .then(res => { })
                            refetch()
                        }
                    })
            }
        });
    }


    return (
        <div className='py-10 w-[92%]  max-w-screen-xl mx-auto relative'>
            <div className='py-20 border border-white rounded-lg grid md:grid-cols-2 bg-gradient-to-br from-[#cae0ff] to-[#fcc3ff] '>

                <div className='text-center border-r-4 border-white'>
                    <img className='rounded-full w-60 h-60 mx-auto' src={dbuser?.photo_url} alt="" />
                    <h2 className='text-4xl font-bold'>{dbuser?.name} <span className='text-lg font-medium'>({dbuser?.role})</span> </h2>
                </div>

                <div className='text-xl font-medium my-auto mt-8 md:mt-4'>
                    <h2 className='text-3xl font-bold text-center md:mb-6'>Your Activities</h2>
                    <div className='space-y-2 px-24 md:px-32 py-6 md:py-12'>
                        <p>Total Task: {stats.tasks}</p>
                        <p>Pending Work: {stats.totalPendingTasks}</p>
                        <p>Total Payment: {stats.totalPayments}$</p>

                    </div>
                </div>

            </div>

            {/* table */}
            <div>
                <div className=' bg-white p-12 my-12 rounded'>

                    <div className="overflow-x-auto rounded-xl my-8">
                        <table className="table table-zebra text-center ">
                            {/* head */}
                            <thead className='bg-gradient-to-r from-[#c3deff] to-[#fac8ff] text-lg uppercase font-medium '>
                                <tr className='h-16'>
                                    <th></th>
                                    <th>Task</th>
                                    <th>Worker</th>
                                    <th>Pay amount</th>
                                    <th>Submission</th>
                                    <th>Approve</th>
                                    <th>Reject</th>
                                </tr>
                            </thead>
                            <tbody className='text-lg'>
                                {
                                    pendings?.map((task, index) =>
                                        <tr >
                                            <th>{index + 1}</th>

                                            <td className='w-[24%] text-start font-medium'>{task.task_title}</td>

                                            <td>
                                                <div className='flex gap-1 items-center justify-center'>
                                                    {task.worker_name}
                                                    <img className='w-6 h-6' src={worker} alt="" />
                                                </div>
                                            </td>

                                            <td >
                                                <div className='flex gap-1 items-center justify-center'>
                                                    {task.payable_amount}
                                                    <img className='w-6 h-6' src={coin} alt="" />
                                                </div>
                                            </td>

                                            <td>
                                                {/* Open the modal */}
                                                <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.8 }}
                                                    onClick={() => handleModal(task)}
                                                    className='btn bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe]'
                                                >View</motion.button>
                                            </td>

                                            <td><motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.8 }}
                                            className='p-1 w-10 text-2xl' onClick={() => handleApproved(task)}><MdDoneOutline className=' hover:text-[#8cbefa]' /></motion.button></td>

                                            <td><motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.8 }}
                                            className='p-1 w-10 text-3xl' onClick={() => handleReject(task)}><HiOutlineArchiveBoxXMark className=' hover:text-[#8cbefa]' /></motion.button></td>

                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {showModal && selected && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-[80%] max-w-xl text-xl space-y-2">
                        <h3 className="text-2xl font-bold text-center mb-6">
                            {selected.task_title}
                        </h3>
                        <p>
                            <strong>Worker Name:</strong>{' '}
                            {selected.worker_name}
                        </p>
                        <p>
                            <strong>Submission Details:</strong>{' '}
                            {selected.submission_Details}
                        </p>
                        <p>
                            <strong>Submission Date:</strong>{' '}
                            {format(selected.current_date, 'dd-MM-yyyy')}
                        </p>
                        <div className="mt-6 text-center">
                            <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                                className="btn bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe] text-white text-lg px-6 py-2 mt-2 rounded"
                                onClick={closeModal}
                            >
                                Close
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;