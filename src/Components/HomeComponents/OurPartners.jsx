import React from 'react';

const OurPartners = () => {
    return (
        <div className="our-partners-section py-16 bg-gray-50">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-semibold mb-6">Our Partners</h2>
                <p className="text-lg text-gray-700 mb-8">We’re proud to collaborate with some of the top businesses to offer the best micro-job opportunities for our community. Together, we’re creating a network that empowers freelancers worldwide.</p>
                
                <div className="partners-logos flex justify-center gap-12">
                    {/* Partner 1 */}
                    <div className="partner-logo relative group">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8R8QqmvD2GHfMgcUODxvVme8Cm6unpEDQ8w&s" alt="Partner 1" className="h-40 w-40 rounded-full" />
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl text-black font-semibold">Emily Wallis</h3>
                            <p className="text-sm text-black">Micro-Job Solutions</p>
                        </div>
                    </div>

                    {/* Partner 2 */}
                    <div className="partner-logo relative group">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3ONrcsf3qgz9CEHEbamRBMZ-OaBaI-dG1Q&s" alt="Partner 2"  className="h-40 w-40 rounded-full"  />
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl text-black font-semibold">Henry Cavill</h3>
                            <p className="text-sm text-black">Global Marketplace</p>
                        </div>
                    </div>

                    {/* Partner 3 */}
                    <div className="partner-logo relative group">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzctMR9cpkyUXGqpSA7E_BLYOM5HsbNkv8Q&s" alt="Partner 3" className="h-40 w-40 rounded-full"  />
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl text-black font-semibold">Alicia Vikander</h3>
                            <p className="text-sm text-black">Freelance Jobs</p>
                        </div>
                    </div>

                    {/* Partner 4 */}
                    <div className="partner-logo relative group">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2FLD3FALgtmLPZgZm4_wEhbS8Fudc9JPnpY461HCdouKCTomwFu5qyActki7prL1Lkzk&usqp=CAU" alt="Partner 4"  className="h-40 w-40 rounded-full  " />
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl text-black font-semibold">James Bond</h3>
                            <p className="text-sm text-black">Talent Marketplace</p>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    );
};

export default OurPartners;
