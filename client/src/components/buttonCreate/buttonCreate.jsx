/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text, sendEmailData, type, disabled= false}) => {
    const sendEmailMessage = () => {
        sendEmailData()
    }
    return ( 
        <button className={style.button_create} disabled={disabled} onClick={sendEmailData && sendEmailMessage()} type={type}>{text}</button>
    );
}
 
export default ButtonCreate;