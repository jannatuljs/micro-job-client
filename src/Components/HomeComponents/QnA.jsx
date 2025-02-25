import React from 'react';
import curious from '../../assets/picture/curious.png'
import { motion } from 'motion/react';

const QnA = () => {
    return (

        <div className='max-w-screen-2xl mx-auto w-[94%] my-36'>
            <h1 className='text-3xl font-bold'>Frequently Asked Questions</h1>
            <p className='text-base mt-8 mb-12 font-semibold md:w-[55%]'>Find quick answers to the most common questions about Earning Platform . If you need more help, feel free to reach out to our support team!</p>

            <div className='md:flex justify-between flex-row-reverse'>
                
                <motion.img 
                whileHover={{ scale: 1.05 }}
                className='md:w-[50%] rounded-md' src={curious} alt="" />

                <div className='md:w-[48%] my-auto'>
                    <div className="collapse collapse-arrow border-b border-[#f8d3fc] rounded-none my-2">
                        <input type="radio" name="my-accordion-2"  />
                        <div className="collapse-title text-xl font-medium">What is Earning Platform?</div>
                        <div className="collapse-content">
                            <p>Earning Platform is a micro-tasking platform that connects users with simple tasks they can complete to earn money quickly and efficiently.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border-b border-[#f8d3fc] rounded-none my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> How do I start earning on Earning Platform?</div>
                        <div className="collapse-content">
                            <p>Simply create an account, browse available tasks, and choose the ones you’d like to complete. Once completed and verified, payments will be credited to your account.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border-b border-[#f8d3fc] rounded-none my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Are there any fees to join Earning Platform?</div>
                        <div className="collapse-content">
                            <p>No, joining Earning Platform is completely free. You can start earning without any upfront cost.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border-b border-[#f8d3fc] rounded-none my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> When do I get paid?</div>
                        <div className="collapse-content">
                            <p>Payments are processed once tasks are reviewed and approved by the task creator. You can withdraw your earnings once you reach the minimum withdrawal limit.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border-b border-[#f8d3fc] rounded-none my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> What types of tasks can I find on Earning Platform?</div>
                        <div className="collapse-content">
                            <p>Tasks include surveys, data entry, product testing, writing reviews, and more. There’s something for everyone!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QnA;