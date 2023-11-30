import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthContext} from './context/authContext.js'
import { useAuth } from './hooks/auth.hook.js';

import HomePage from "./pages/home/homePage.jsx";
import Auth from './pages/auth/auth.jsx';
import Main from './pages/main/main.jsx'
import ReadyGifts from './pages/readyGifts/readyGifts.jsx';
import Registration from './components/registration/registration.jsx';
import Login from './components/login/login.jsx';
// import {useRoutes} from '../routes.js'

function App() {

  const {login, logout, token, userId, isReady} = useAuth()
    // const isLogin = !!token
    // // const router = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady}}>
        <Router>
          <Routes>
            <Route path="/*" element= {<HomePage/>}>
                <Route index element={<Main/>} />
                <Route path="ready-gifts" element={<ReadyGifts/>} />
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
