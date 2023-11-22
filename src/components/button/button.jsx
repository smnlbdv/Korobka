/* eslint-disable react/prop-types */
import style from './button.module.scss'

const Button = ({title}) => {
    return ( 
        <button className={style.button_login}>{title}</button>
     );
}
 
export default Button;