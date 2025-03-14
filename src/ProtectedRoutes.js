import React,{useContext, useEffect} from 'react'
import { Navigate } from 'react-router-dom' 
import { GpuContext } from './Contexts/Gpus/gpuContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Loader from './Components/Loader/Loader'


const ProtectedRoutes = ({children}) => {
  console.log("Protected routes mounting")

    const {authState, setAuthState} = useContext(GpuContext)

   useEffect(()=>{
    console.log("Effect running");
    console.log("Initial authState:", authState);
    console.log("Auth object:", auth);

    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      console.log("Auth state changed - User:", user);
      setAuthState(prevState => ({
        ...prevState,
        isAuthenticated: !!user,
        isLoading: false,


      }))
      console.log(authState)
    })

    return ()=>unsubscribe()

   },[setAuthState])

   if(authState.isLoading){
    return <div><Loader/></div>
   }

   
   if(!authState.isAuthenticated){
    return <Navigate to="/" replace/>
   }

   return children


}

export default ProtectedRoutes
