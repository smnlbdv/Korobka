import {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthContext} from './context/authContext.js'
import { useAuth } from './hooks/auth.hook.js';

import Loading from './components/loading/loading.jsx';
import Cart from './pages/cart/cart.jsx';

const HomePage = lazy(() => import('./pages/home/homePage.jsx'));
const Auth = lazy(() => import('./pages/auth/auth.jsx'));
const Main = lazy(() => import('./pages/main/main.jsx'));
const ReadyGifts = lazy(() => import('./pages/readyGifts/readyGifts.jsx'));
const Registration = lazy(() => import('./components/registration/registration.jsx'));
const Login = lazy(() => import('./components/login/login.jsx'));
const Contacts = lazy(() => import('./pages/contacts/contacts.jsx'));
const AboutUs = lazy(() => import('./pages/aboutUs/aboutUs.jsx'));

function App() {

  const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
        <Router>
          <Routes>
            <Route path="/" element= {
              <Suspense fallback={<Loading/>}>
                <HomePage/>
              </Suspense>
            }>
                <Route index element={<Main/>} />
                <Route path="ready-gifts" element={<ReadyGifts/>} />
                <Route path="contacts" element={<Contacts/>} />
                <Route path="about-us" element={<AboutUs/>} />
                <Route path="cart" element={<Cart/>}/>
            </Route>
            <Route path="/api/auth/*" element= {<Auth/>}>
              <Route path="registration" element={<Registration/>} />
              <Route path="login" element={<Login/>} />  
            </Route>
          </Routes>
        </Router>
    </AuthContext.Provider>
  )
}

export default App
