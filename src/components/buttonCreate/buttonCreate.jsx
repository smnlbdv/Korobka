/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text}) => {
    return ( 
        <button className={style.button_create}>{text}</button>
    );
}
 
export default ButtonCreate;