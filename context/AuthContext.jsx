import { signInWithCustomToken } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import React, {useState, createContext,useContext} from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [user, setUser]=useState(null)
    const [token, setToken]=useState(localStorage.getItem('site')||"")
    const navigate = useNavigate();
    const loginAction = async (data)=>{
        let userCreds
        try{
            const response = await fetch('https://api.indiegpu.com/auth/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body: JSON.stringify(data)
            })
            // const auth = getAuth()
            const res = await response.json()
            if(res){
                
                userCreds=await signInWithCustomToken(auth, res.access_token)
                console.log(userCreds)
                if(userCreds){
                    setToken(res.access_token)
                    localStorage.setItem("site",res.access_token)
                    setUser(prev =>({
                        ...prev,
                        userid:res.user_id,
                        username:res.displayName
                    }))
                    
                    navigate("/dashboard")
                }
                    
                    
                return 
            }
            throw new Error(res.message)

        }catch(err){
            console.error(err)
        }
    }
    const signupAction = async (data)=>{
        let client_token
        try{
            const response = await fetch('https://api.indiegpu.com/auth/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body: JSON.stringify(data)
            })
            // const auth = getAuth()
            const res = await response.json()
            if(res.data){
                client_token= signInWithCustomToken(auth, res.access_token)
                if(client_token){
                    setToken(client_token)
                    localStorage.setItem("site",res.client_token)
                    navigate("/dashboard")
                    setUser(prev =>({
                        ...prev,
                        userid:res.data.user_id,
                        username :res.data.name
                    }))
                }
                
                return
            }
            throw new Error(res.message)

        }catch(err){
            console.error(err)
        }

    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
      };

    return( 
    <AuthContext.Provider
    value={{token, user, loginAction,signupAction, logOut}}
    
    >{children}</AuthContext.Provider>
)
}

export default AuthProvider

export const useAuth = ()=>{
    return useContext(AuthContext)
}