import React from 'react';
import { GrHistory, GrMail, GrTask } from 'react-icons/gr';
import { LiaAwardSolid } from "react-icons/lia";
import { IoMdHome } from 'react-icons/io';
 
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo/logo.jpeg'
import { AiOutlineFire } from "react-icons/ai";
import { FaBook, FaListUl, FaTasks } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { TbNetwork } from 'react-icons/tb';
import { BsCurrencyExchange, BsListTask, BsMicrosoftTeams } from 'react-icons/bs';
import { RiPlayListAddLine } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import Footer from '../Components/Shared/Footer';
import DashNav from '../Components/Shared/DashNav';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useWorker from '../Hooks/useWorker';
 



const Dashboard = () => {

    const [isAdmin] = useAdmin()
    const [isBuyer] = useBuyer()
    const [isWorker] = useWorker()

    return (
        <div>

            <Helmet>
                <title>Earning Platform | Dashboard</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-[#edeff0]">
                    {/* Page content here */}
                    {/* sidewbar button */}
                    {/* <label htmlFor="my-drawer-2" className=" drawer-button absolute left-5 top-3 lg:hidden">
                        <IoMenu className='text-2xl' />
                    </label> */}
                    <DashNav />
                    <Outlet />
                    <Footer />

                </div>
                <div className="drawer-side z-20 border-r border-white">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-gradient-to-br from-[#f1f5fb] to-[#d2e3fb] text-xl min-h-full w-80 p-4">
                        {/* Sidebar content here */}

                        <div className=' flex gap-4 mx-auto py-14'>
                            <img className='w-10' src={logo} alt="" />
                            <Link to={'/'} className=" text-2xl md:text-3xl  font-light  bg-gradient-to-r from-[#88bcfc] to-[#f2aef8] text-transparent bg-clip-text">Earning Platform</Link>
                        </div>


                        {/* admin routes */}
                        {
                            isAdmin &&
                            <div className='  py-16'>

                                <li><NavLink to='/dashboard/adminhome' className={'py-3 my-1'}><IoMdHome className='text-2xl' />Admin Home</NavLink></li>

                                <li><NavLink to='/dashboard/allusers' className={'py-3 my-1'}><MdGroups className='text-2xl' />All Users</NavLink></li>

                                <li><NavLink to='/dashboard/alltasks' className={'py-3 my-1'}><TbNetwork className='text-2xl' />Manage Tasks</NavLink></li>


                            </div>
                        }


                        {/* worker routes */}
                        {
                            isWorker &&
                            <div className='  py-16'>

                                <li><NavLink to='/dashboard/userhome' className={'py-3 my-1'}><IoMdHome className='text-2xl' />User Home</NavLink></li>

                                <li><NavLink to='/dashboard/tasklist' className={'py-3 my-1'}><BsListTask className='text-2xl' />Task List</NavLink></li>

                                <li><NavLink to='/dashboard/submissions' className={'py-3 my-1'}><GrTask className='text-2xl' />My Submissions</NavLink></li>

                                <li><NavLink to='/dashboard/withdrawals' className={'py-3 my-1'}><BsCurrencyExchange className='text-2xl' />Withdrawals</NavLink></li>

                            </div>
                        }


                        {/* buyer routes */}
                        {
                            isBuyer &&
                            <div className='  py-14'>

                                <li><NavLink to='/dashboard/buyerhome' className={'py-3 my-1'}><IoMdHome className='text-2xl' />Buyer Home</NavLink></li>


                                <li><NavLink to='/dashboard/addtask' className={'py-3 my-1'}><RiPlayListAddLine className='text-2xl' />Add new tasks</NavLink></li>


                                <li><NavLink to='/dashboard/mytasks' className={'py-3 my-1'}><FaTasks className='text-2xl' />My Tasks</NavLink></li>


                                <li><NavLink to='/dashboard/purchase' className={'py-3 my-1'}><BsCurrencyExchange className='text-2xl' />Purchase Coins</NavLink></li>


                                <li><NavLink to='/dashboard/transactions' className={'py-3 my-1'}><GrHistory className='text-2xl' />Payment History</NavLink></li>

                            </div>
                        }


                        <hr className='my-10 bg-white h-1' />

                        {/* shared routes */}
                        <div className=' '>
                            <li className='my-2'><Link to={'/'}><IoMdHome className='text-2xl' />Home</Link></li>
                            <li className='my-2'><Link to={'/'}><LiaAwardSolid  className='text-2xl' />Top Workers</Link></li>
                            <li className='my-2'><Link to={'/'}><AiOutlineFire className='text-2xl' />Testimonials</Link></li>
                            <li className='my-2'><Link to={'/'}><BsMicrosoftTeams className='text-2xl' />Our Partners</Link></li>

                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;