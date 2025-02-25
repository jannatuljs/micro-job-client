import React, { useContext } from 'react';
import { IoMenu } from 'react-icons/io5';
import bank from '../../assets/icons/coin.png'
import useUser from '../../Hooks/useUser';
import { AuthContext } from '../Provider/AuthProvider';
import logo from '../../assets/logo/logo.jpeg'
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { format } from 'date-fns';

const DashNav = () => {

    const [dbuser] = useUser()
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications/${dbuser?.email}`)
            return res.data || []
        }
    })
// console.log(notifications)

    return (
        <div className='sticky top-0 z-10 bg-white bg-opacity-80'>
            <div className="navbar">
                <div className="navbar-start">

                    {/* sidebar button */}
                    <label htmlFor="my-drawer-2" className=" drawer-button absolute left-5 top-4 lg:hidden">
                        <IoMenu className='text-2xl my-2' />
                    </label>

                    {/* logo */}
                    <div className="ml-12 hidden md:flex gap-2 lg:hidden">
                        <img className='w-10' src={logo} alt="" />
                        <Link to={'/'} className=" text-2xl md:text-3xl font-bold  bg-gradient-to-r from-[#88bcfc] to-[#f2aef8] text-transparent bg-clip-text">Earning Platform</Link>
                    </div>

                </div>


                <div className="navbar-end">

                    {/* name role */}
                    <div className='mx-2 text-end'>
                        <h3 className='font-bold text-lg'>{user?.displayName}</h3>
                        <p className='font-semibold text-xs flex gap-1'><span className='hidden md:block'>{user?.displayName} is a </span> {dbuser?.role}</p>
                    </div>

                    {/* picture */}
                    <div role="button" className="btn mx-2 btn-ghost btn-circle avatar">
                        <div className="w-11 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={dbuser?.photo_url} />
                        </div>
                    </div>

                    {/* coin */}
                    <div className='grid grid-cols-2 border-2 p-1 px-3 mx-1 my-2 min-w-14  rounded-md'>
                        <div className=' my-auto md:mx-auto text-lg'>{dbuser?.coin}</div>
                        <div><img className='w-8' src={bank} alt="" /></div>
                    </div>

                    {/* notification */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 rounded-full">
                                <IoMdNotificationsOutline className='text-4xl' />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className=" dropdown-content h-fit max-h-96 overflow-x-auto bg-base-100 rounded-box z-[1] mt-6 mr-39 w-96 p-4 px-6 text- shadow">
                            {
                                notifications?.map((notif, index) => (
                                    <div key={index} className='border-b py-2'>
                                        <li key={index} className=' font-medium'>{notif.message}</li>
                                        <p className='text-end'>{format(notif.Time, 'dd-MM-yyyy')}</p>
                                    </div>
                                ))
                            }
                            
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashNav;