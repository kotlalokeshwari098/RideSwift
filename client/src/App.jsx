import React from 'react'
import { createBrowserRouter,BrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainRegister'



const routes=createBrowserRouter( createRoutesFromElements(
    <Route>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<UserLogin/>}/>
       <Route path='/signup' element={<UserSignup/>}/>
       <Route path='/captainlogin' element={<CaptainLogin/>}/>
       <Route path='/captainsignup' element={<CaptainSignup/>}/> 


    </Route>
))

const App = () => {
  return (
    <RouterProvider  router={routes}/>
    
  )
}

export default App