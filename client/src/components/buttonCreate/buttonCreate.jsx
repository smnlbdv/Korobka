/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text, sendEmailData}) => {
    return ( 
        <button className={style.button_create} onClick={() => sendEmailData()}>{text}</button>
    );
}
 
export default ButtonCreate;