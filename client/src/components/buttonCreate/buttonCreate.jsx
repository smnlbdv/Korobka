/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text, sendEmailData, type, disabled = false }) => {
    const sendEmailMessage = () => {
        sendEmailData()
    }
    return ( 
        <button className={style.button_create } onClick={sendEmailData && sendEmailMessage()} type={type} disabled={disabled}>{text}</button>
    );
}
 
export default ButtonCreate;