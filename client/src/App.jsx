import React from 'react'
import { createBrowserRouter,BrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainRegister'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'



const routes=createBrowserRouter( createRoutesFromElements(
    <Route>
       <Route path='/' element={<Start/>}/>
       <Route path='/login' element={<UserLogin/>}/>
       <Route path='/signup' element={<UserSignup/>}/>
       <Route path='/captainlogin' element={<CaptainLogin/>}/>
       <Route path='/captainsignup' element={<CaptainSignup/>}/> 
       <Route path='/home'  element={
          <UserProtectWrapper>
               <Home/>
          </UserProtectWrapper>
        }/> 

       <Route path="/userlogout" element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
       }/>

       <Route path='/captainhome' element={
          <CaptainProtectWrapper>
              <CaptainHome />
          </CaptainProtectWrapper>
       }/>
    </Route>
))

const App = () => {
  return (
    <RouterProvider  router={routes}/>
    
  )
}

export default App