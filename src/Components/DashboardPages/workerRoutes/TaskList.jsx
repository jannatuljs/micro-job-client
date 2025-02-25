import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../../Shared/TaskCard';

const TaskList = () => {

    const axiosSecure = useAxiosSecure()

    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks')
            return res.data || []
        },
    })

    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    const availableTask = Array.isArray(tasks) ? tasks.filter(task => task?.required_workers > 0) : []

    return (
        <div className='py-10'>
            <div className='max-w-screen-xl w-[92%] mx-auto grid gap-5 lg:grid-cols-2'>
                {
                    availableTask.map(task => <TaskCard key={task._id} task={task} />)
                }
            </div>
        </div>
    );
};

export default TaskList;