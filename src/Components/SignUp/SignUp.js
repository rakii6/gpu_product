import React, { useContext } from 'react';
import './SignUp.css';
import { GpuContext } from '../../Contexts/Gpus/gpuContext';
import Modal from './Modal';

const SignUpButton = () => {

    const {isSignupModalOpen, setIsSignupModalOpen} = useContext(GpuContext)

    const handleModal=()=>{
        setIsSignupModalOpen(true)
    }
  return (
  <>
   <button 
   
   onClick={handleModal}
   
   className="sign-up-button">
      Sign Up
    </button>

   

  </>
   



  );
};


export default SignUpButton;