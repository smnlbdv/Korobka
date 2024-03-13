import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.js";
/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'


const ButtonCreate = ({_id, text, type, isCounter = false, setIsCounter, getCountProduct, disabled = false }) => {
    
    const [counterCart, setCounterCart] = useState(0);
    const { addCart, decreaseCartItem, unmountItem } = useContext(AuthContext);

    const addProduct = async () => { 
        if (counterCart >= 200) {
            setCounterCart(counterCart);
        } else {
          await addCart(_id)
          await getCountProduct()
          setCounterCart(counterCart + 1);
        }
    };
    const subtractProduct = () => {
        // if (counterCart <= 1) {
        //   unmountItem(_id);
        // } else {
        //   const resultDeCrease = decreaseCartItem(_id);
        //   if (resultDeCrease) {
        //     setCounterCart(counterCart - 1);
        //   }
        // }
    };
    const openCounterBlock = async () => {
        setIsCounter(true)
        addProduct()
    }

    return ( 
        <button className={style.button_create } type={type} disabled={disabled} onClick={() => openCounterBlock()}>
            {
            !isCounter ? 
                text
                :
                <div className={style.counter__block}>
                    <img className={style.image__minus} src="/assets/minus-hidden-block.svg" alt="Minus" onClick={subtractProduct} />
                    <p className={style.image__counter}>{counterCart}</p>
                    <img className={style.image__plus} src="/assets/plus-hidden-block.svg" alt="Plus" onClick={() => addProduct}/>
                </div>
            }
        </button>
    );
}
 
export default ButtonCreate;