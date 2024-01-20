/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'

const ButtonCreate = ({text, sendEmailData, type, disabled = false, isCounter = false, counter = 0 }) => {
    const sendEmailMessage = () => {
        sendEmailData()
    }
    return ( 
        <button className={style.button_create } onClick={sendEmailData && sendEmailMessage()} type={type} disabled={disabled}>
            {
            isCounter ? 
            text
            :
            <div className={style.counter__block}>
                <img className={style.image__minus} src="/assets/minus-hidden-block.svg" alt="Plus" />
                <p className={style.image__counter}>{counter}</p>
                <img className={style.image__plus} src="/assets/plus-hidden-block.svg" alt="Plus" />
            </div>
            }
        </button>
    );
}
 
export default ButtonCreate;