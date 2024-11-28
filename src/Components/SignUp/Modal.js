import React , {useContext, useState,useEffect}from 'react';
import './SignUp.css';
import { GpuContext } from '../../Contexts/Gpus/gpuContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, AuthErrorCodes} from 'firebase/auth';
import {auth, db} from '../../firebase.js'
import {doc, setDoc} from "firebase/firestore"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Modal = () => {

  

  const navigate = useNavigate()
  const {isSignupModalOpen, 
    setIsSignupModalOpen, 
    formValues,
    setFormValue,user, setUser} = useContext(GpuContext)



  const[type, setType]=useState(true)
  const [error, setError]=useState('')




  


  if (!isSignupModalOpen) return null;

  const handleClose=()=>{
    setIsSignupModalOpen(false)
  }
  const handleType=()=>{
    setType(!type)
  }

  const handleChange=(event)=>{
    const {name,value} = event.target
    setFormValue(preValues=>({
      ...preValues,
      [name]:value
    }))}

    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password, confirmPassword } = formValues;
    try{
      if (!type) {
        // Handle Login
        
          const userCredentials = await signInWithEmailAndPassword(auth, email, password);
          console.log("User logged in:", userCredentials);
          navigate('/dashboard')

      } else {
        // Handle Sign-Up
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match!");
        
        }
    
     
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully:", userCred);
          navigate('/dashboard')

    
          // Optional: Save user data to Firestore
          // await setDoc(doc(db, "users", user.uid), {
          //   name: userName,
          //   email: user.email,
          //   createdAt: new Date(),
          // });
      }
      setIsSignupModalOpen(false); // Close the signup modal
    
     } catch (error) {
            console.error("AUTHENTICATION ERROR", error.message);
            const errorMessage = getAuthErrorMessage(error.code)
            alert(errorMessage)
          }
        }
     

  // fucnntion to provide error message
  
  const getAuthErrorMessage= (errorCodes)=>{
    switch (errorCodes) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in instead.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
    
    









  return (
   <div className="modal-overlay" onClick={handleClose}>
  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
      <h2>{type === true ? 'Sign Up' : 'Sign In'}</h2>
      <button className="modal-close" onClick={handleClose}>✕</button>
    </div>
    <form  onSubmit={handleSubmit} className="modal-form">
      {/* Social Login Buttons */}
      {/* <div className="modal-social-login">
        <button type="button" className="modal-social-btn">
          Google
        </button>
        <button type="button" className="modal-social-btn">
          Facebook
        </button>
      </div> */}
      
      {/* Divider */}
      {/* <div className="modal-form-divider">
        <span>Or continue with</span>
      </div> */}

      <div className="modal-input-group">

        <label>Email</label>
        <input type="email" placeholder="Enter your email" 
        id ="email"
        name="email"
        value={formValues.email}
        onChange={handleChange} />

      </div>

      <div className="modal-input-group">

        <label>Password</label>
        <input type="password" placeholder="Enter your password"
        id="password"
        name="password" 
        value={formValues.password}
        onChange={handleChange} />

      </div>
      
      {/* Sign In Specific Elements */}
      {type !== true && (
        <>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </>
      )}
      
      {/* Confirm Password for Sign Up */}
      {type === true && (
        <div className="modal-input-group">
          <label>Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formValues.confirmPassword} type="password" placeholder="Confirm your password" />
        </div>
      )}
      
      <button type="submit" className="modal-submit">
        {type === true ? 'Create Account' : 'Sign In'}
      </button>
    </form>
   
    
    {/* Footer */}
    <div className="modal-footer">
      <p>
        {type === true
          ? 'Already have an account?' 
          : "Don't have an account?"}
        <a onClick={handleType}>
          {type === true ? 'Sign In' : 'Sign Up'}
        </a>
      </p>
    </div>
  </div>
</div>
  );
};

export default Modal;
