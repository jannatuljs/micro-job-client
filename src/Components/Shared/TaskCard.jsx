import React from 'react';
import { GoDotFill } from "react-icons/go";
import coin from '../../assets/icons/coin.png'
import worker from '../../assets/icons/employee.png'
import deadline from '../../assets/icons/schedule.png'
import buyer from '../../assets/icons/business-women.png'
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const TaskCard = ({ task }) => {

    const { _id, task_title, task_image_url, buyer_email, buyer_name, required_workers, payable_amount, completion_date } = task

    return (
        <div className='p-1 h-fit rounded-lg bg-gradient-to-r from-[#abcffb] to-[#fbcfff]'>
            <div className=" p-[6px] rounded-lg bg-base-100 shadow-xl">
                <div className='h-full rounded-md border-2 '>

                    <img
                        className='rounded-md rounded-b-none w-full h-56'
                        src={task_image_url}
                        alt="Loading..." />

                    <div className="p-3 h-1/2 ">

                        <h2 className="text-2xl font-bold h-20">{task_title}</h2>

                        <ul type='circle' className='font-medium space-y-1 text-lg  pl-3 my-3 '>

                            <li className='flex items-center gap-2'>
                                <img className='w-5 h-5' src={coin} alt="" />
                                Pay Amount: {payable_amount}
                            </li>

                            <li className='flex items-center gap-2'>
                                <img className='w-5 h-5' src={worker} alt="" />
                                Required Workers: {required_workers}
                            </li>

                            <li className='flex items-center gap-2'>
                            
                                <img className='w-5 h-5' src={deadline} alt="" />
                                Deadline: {completion_date}
                                
                            </li>

                            <li className='flex items-center gap-2'>
                                <img className='w-5 h-5' src={buyer} alt="" />
                                Buyer Name: {buyer_name}
                            </li>

                        </ul>

                        <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        className='pb-0'>
                            <Link to={`/dashboard/tasklist/${_id}`} className="btn w-full mt-2 text-lg bg-gradient-to-r from-[#b2d4fd] to-[#fac8fe]">View Details</Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;