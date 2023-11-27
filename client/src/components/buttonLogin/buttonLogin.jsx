/* eslint-disable react/prop-types */
import style from './buttonLogin.module.scss'

const ButtonLogin = ({title, submitInfo}) => {
    return ( 
        <input className={style.btn_login} type="reset" value={title} onClick={submitInfo}/>
     );
}
 
export default ButtonLogin;