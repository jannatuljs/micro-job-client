import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'
import { toast } from 'react-toastify';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useImageHosting from '../../Hooks/useImageHosting';
import { motion } from 'motion/react';


const Register = () => {

    const { user, setUser, loginWithGoogle, createUser, updateUserProfile, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const image_hosting_api = useImageHosting()
    const [emailErr, setEmailErr] = useState(null)
    const [passErr, setPassErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const role = form.role.value
        const password = form.password.value

        setEmailErr(null)
        setPassErr(null)

        // role required
        if (role === 'default') {
            return toast.warning('Please select a role');
        }

        // password validation
        if (!/[A-Z]/.test(password)) {
            return setPassErr('Password must contain at least one uppercase')
        }
        if (!/[a-z]/.test(password)) {
            return setPassErr('Password must contain at least one lowercase')
        }
        if (!/\d/.test(password)) {
            return setPassErr('Password must contain at least one digit')
        }
        if (!/.{6,}/.test(password)) {
            return setPassErr('Password must contain at least six characters')
        }


        const imageFile = { image: form.photo.files[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
   

        const photo = res.data.data.display_url

        if (res.data.success) {

            createUser(email, password)
                .then(result => {
                  
                    setUser(result.user)
                    updateUserProfile(name, photo)
                        .then(() => {
                            
                            const userInfo = {
                                name: name,
                                email: email,
                                photo_url: photo,
                                role: role,
                                coin: role == 'worker' ? 10 : 50
                            }
                            
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.acknowledged) {
                                        toast.success('User created successfully')
                                        setLoading(false)
                                        navigate('/')
                                    }
                                })
                                .catch(err => {

                                })
                        })
                        .catch(err => {
                            
                            toast.error("couldn't update user profile")
                        })
                })
                .catch(err => {
                    
                    setEmailErr('This email already exists, try with another email')
                })
        }


    }


    return (
        <div className=' bg-white mt-5 mb-4 shadow-2xl p-12 w-[94%] max-w-lg rounded-lg border' >

            <div className='relative md:w-96 mx-auto'>
                <h1 className='text-3xl font-bold text-center py-4'>Sign Up</h1>
                <form onSubmit={handleSubmit} className="">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="your name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="your email" className="input input-bordered" required />
                        {
                            emailErr &&
                            <div className='text-center text-red-600'>{emailErr}</div>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" name='photo' className='file-input file-input-ghost file-input-bordered w-full bg-white mx-auto' required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select type="text" name='role' defaultValue={'default'} className="input input-bordered" required>
                            <option disabled value="default">Select a role</option>
                            <option value="buyer">Buyer</option>
                            <option value="worker">Worker</option>

                        </select>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        {
                            passErr &&
                            <div className='text-center text-red-600'>{passErr}</div>
                        }
                    </div>

                    <div className="form-control mt-6">
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        className="btn bg-gradient-to-r from-[#8cbefa] to-[#f4b4fa]">Sign in</motion.button>
                    </div>
                </form>
                <div className='text-center my-3'>
                    <Link to={'/auth'} className='text-center '>Already registered?<span className='hover:text-[#8cbefa]'> Go to log in</span></Link>
                 
                </div>
            </div>
        </div>
    );
};

export default Register;