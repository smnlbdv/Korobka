/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text, sendEmailData, type}) => {
    const sendEmailMessage = () => {
        sendEmailData()
    }
    return ( 
        <button className={style.button_create} onClick={sendEmailData && sendEmailMessage()} type={type}>{text}</button>
    );
}
 
export default ButtonCreate;