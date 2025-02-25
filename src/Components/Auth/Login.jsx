import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { TbEyeglass, TbEyeglassOff } from 'react-icons/tb';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { motion } from 'motion/react';

const Login = () => {

    const { user, setUser, loginWithGoogle, loginWithEmailPass, setLoading } = useContext(AuthContext)

    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);
    const [show, setShow] = useState(false);
    const [captchaInpLen, setCaptchaInpLen] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value


        loginWithEmailPass(email, password)
            .then(result => {

                setUser(result.user)
                setLoading(false)
                navigate(location.state?.from?.pathname || '/')
                toast.success('logged in successfully')
            })
            .catch(err => {

                toast.error('Invalid email or password')
            })
    }

    // google login as worker
    const handleGoogle = () => {
        loginWithGoogle()
            .then(res => {
                toast.success('Logged in with google')
                navigate('/')
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photo_url: res.user.photoURL,
                    role: 'worker',
                    coin: 10,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.acknowledged) {
                            setLoading(false)
                        }
                    })
                    .catch(err => {  })
            })
            .catch(err => {
                toast.error('Something went wrong. try again')
            })
    }



    // show password
    const handleShow = () => {
        setShow(!show)
    }



    // captcha verify
    const handleValidateCaptcha = e => {
        const user_captcha_value = captchaRef.current.value
        setCaptchaInpLen(user_captcha_value.length)

        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }

    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [captchaInpLen === 0])


    return (
        <div className=' mt-5 mb-5 shadow-2xl p-12 bg-white   w-[94%] max-w-lg rounded-lg border'>

            <div className='relative md:w-96 mx-auto'>
                <h1 className='text-3xl font-bold text-center   pt-3 pb-7'>Login</h1>
                <form onSubmit={handleSubmit} className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={show ? "text" : "password"} name='password' placeholder="password" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-4">
                        <label className="label ">
                            <LoadCanvasTemplate />
                        </label>
                        <div className='flex'>
                            <input ref={captchaRef} type="text" placeholder="type the text above" className="input w-full input-bordered" required />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        disabled={disable} className="btn bg-gradient-to-r from-[#8cbefa] to-[#f4b4fa]">Login</motion.button>
                    </div>
                </form>

                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleShow} className='absolute right-3 bottom-[348px] text-[#f07ffa]'>
                    {show ? <FaEye /> : <FaEyeSlash />}
                </motion.button>

                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleValidateCaptcha} className='absolute right-3 bottom-[214px] text-[#f07ffa]'>
                    {disable ? <MdCheckBoxOutlineBlank /> : <MdCheckBox />}
                </motion.button>

                <div className='text-center my-3'>
                    <Link to={'/auth/register'} className='text-center'>New here? Create a <span className='hover:text-[#8cbefa]'>New Account</span></Link>
                    <p className='text-center my-4 text-gray-600'>Or sign in with</p>
                    <div className=' w-1/3 mx-auto mt-5 flex justify-between'>
                        <div className='border border-[#444444] rounded-full p-1 '>
                            <FaFacebook className='text-xl text-[#444444]' />
                        </div>

                        <div className='border border-[#444444] rounded-full p-1 '>
                            <FaGoogle onClick={handleGoogle} className='text-xl text-[#444444] hover:text-[#8cbefa]' />
                        </div>

                        <div className='border border-[#444444] rounded-full p-1'>
                            <FaGithub className='text-xl text-[#444444]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;