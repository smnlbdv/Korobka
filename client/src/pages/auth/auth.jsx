import { Route, Routes} from 'react-router-dom';

import style from './auth.module.scss'

import Registration from '../../components/registration/registration.jsx';
import Login from '../../components/login/login.jsx';

const Auth = () => {

    return (
        <div className={style.wrapper}>
            <Routes>
                <Route path="registration" element={<Registration/>} />
                <Route path="login" element={<Login/>} />
            </Routes>
        </div>
    );
}
 
export default Auth;