import { Outlet } from "react-router-dom";

import NavigateAdmin from "../../components/navigateAdmin/navigateAdmin";

import style from './homePafeAdmin.module.scss'

const HomePageAdmin = () => {
    
    return ( 
        <div className={style.wrapper_admin}>
            <NavigateAdmin />
            <Outlet/>
        </div>
     );
}
 
export default HomePageAdmin;