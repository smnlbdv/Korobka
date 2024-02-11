import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.js";
/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'


const ButtonCreate = ({_id, text, sendEmailData = false, type, getCountProduct, isCounter = false, addCart, setIsCounter, disabled = false, counter, addCartPage }) => {
    
    const { increaseCartItem, decreaseCartItem, unmountItem } = useContext(AuthContext);
    const [counterCart, setCounterCart] = useState(counter)

    const addProduct = () => {  
        if (counterCart >= 200) {
            setCounterCart(counterCart);
        } else {
          const resultIncrease = increaseCartItem(_id);
          if (resultIncrease) {
            setCounterCart(counterCart + 1);
          }
        }
    };
    const subtractProduct = () => {
        if (counterCart <= 1) {
          unmountItem(_id);
        } else {
          const resultDeCrease = decreaseCartItem(_id);
          if (resultDeCrease) {
            setCounterCart(counterCart - 1);
          }
        }
    };
    const sendEmailMessage = () => {
        sendEmailData()
    }
    const openCounterBlock = async () => {
        setIsCounter(true)
        addCartPage()
    }

    return ( 
        <button className={style.button_create } type={type} disabled={disabled}>
            {
            !isCounter ? 
                text
                :
                <div className={style.counter__block}>
                    <img className={style.image__minus} src="/assets/minus-hidden-block.svg" alt="Minus" onClick={subtractProduct} />
                    <p className={style.image__counter}>{counterCart}</p>
                    <img className={style.image__plus} src="/assets/plus-hidden-block.svg" alt="Plus" onClick={addProduct}/>
                </div>
            }
        </button>
    );
}
 
export default ButtonCreate;