import React ,{createContext, useState,useEffect}from 'react'


export const GpuContext = createContext()


export const GpuContextProvider = ({children})=>{
  
    
    
    const gpuData = [
        { name: 'NVIDIA RTX 3090', available: true, price: 0.75 },
        { name: 'NVIDIA RTX 3080', available: true, price: 0.50 },
        { name: 'NVIDIA RTX 3070', available: false, price: 0.35 },
        { name: 'NVIDIA RTX 2080 Ti', available: true, price: 0.40 },
        { name: 'NVIDIA GTX 1080 Ti', available: false, price: 0.25 },
      ];
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    const [formValues, setFormValue]= useState(
      {
        email:'',
        password:'',
        confirmPassword:''
      }
    )
    const [authState, setAuthState] = useState({

      isAuthenticated: false,
      isLoading: true,
    })
    
    useEffect(() => {
      console.log("Context auth state changed:", authState);
    }, [authState]);
    


      const value = {
        gpuData,
        isSignupModalOpen,
        setIsSignupModalOpen, 
        formValues,
        setFormValue,
        authState, setAuthState
      }
      
        return (
          <GpuContext.Provider value={value}> 
            {children}
          </GpuContext.Provider>
            
       
        )

}










    
    
   
 

    
    


      









