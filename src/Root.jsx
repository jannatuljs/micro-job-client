import React from 'react';
import Navbar from './Components/Shared/Navbar';
import Footer from './Components/Shared/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
};

export default Root;