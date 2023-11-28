import { BrowserRouter as Routes, Route} from 'react-router-dom';

import HomePage from "./src/pages/home/homePage";
import Auth from "./src/pages/auth/auth";

export const useRoutes = (isLogin) => {
    if(isLogin) {
        return (
            <Routes>
                <Route path='/' exact element={<HomePage/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/api/auth/login' exact element={<Auth/>}/>
        </Routes>
    )
}