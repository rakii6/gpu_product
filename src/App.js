import React from 'react';
import './App.css';
import Landing from './Components/Landing/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDashboard from './Components/Dashboard/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';




function App() {





  return (
 <BrowserRouter>
 <Routes>
    <Route index path='/' element={<Landing/>}/>
    <Route path='/dashboard' element ={
    <ProtectedRoutes>
       <UserDashboard/>
    </ProtectedRoutes>}
    
    />
      
 </Routes>
 </BrowserRouter>
  );
}

export default App;
