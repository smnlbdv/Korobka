/* eslint-disable react/prop-types */
import style from './button.module.scss'
import { Link } from 'react-router-dom' 

const Button = ({title, path}) => {
    return ( 
        <Link to={path}>
            <button className={style.button_login}>{title}</button>
        </Link>
     );
}
 
export default Button;