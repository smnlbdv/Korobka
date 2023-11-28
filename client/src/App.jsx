import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/home/homePage.jsx";
import Auth from './pages/auth/auth.jsx';
import {AuthContext} from './context/authContext.js'
import { useAuth } from './hooks/auth.hook.js';
// import {useRoutes} from '../routes.js'

function App() {

  const {login, logout, token, userId, isReady} = useAuth()
    // const isLogin = !!token
    // // const router = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady}}>
        <Router>
          <Routes>
            <Route path="/*" element= {<HomePage/>}/>
            <Route path="/api/auth/*" element= {<Auth/>}/>
          </Routes>
        </Router>
    </AuthContext.Provider>
  )
}

export default App
