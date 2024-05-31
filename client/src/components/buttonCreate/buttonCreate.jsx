import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.js";
/* eslint-disable react/prop-types */
import style from './buttonCreate.module.scss'
import { addProductCartAsync, decreaseCartItemAsync, deleteCartItemAsync, increaseCartItemAsync } from '../../store/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';


const ButtonCreate = ({_id, text, type, isCounter = false, setIsCounter, setCounterCart, counterCart, button = false, disabled = false }) => {
    
    const { openNotification, openNotificationError} = useContext(AuthContext);
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    const addProduct = async () => { 
        if(counterCart >= 200) {
            setCounterCart(counterCart)
        } else {
            dispatch(increaseCartItemAsync(_id))
                    .then(result => {
                        if(result.payload.increase) { 
                            setCounterCart(counterCart + 1)
                            openNotification('bottomRight', 'Количество товара увеличено');
                        }
                    })
                    .catch(() => {
                        openNotificationError('bottomRight', 'Ошибка добавления товара');
                    })
        }
    };

    const subtractProduct = () => {
        if (counterCart <= 1) {
            dispatch(deleteCartItemAsync(_id))
                .then(() => {
                    setIsCounter(false)
                    setCounterCart(0)
                })
        } else {
            dispatch(decreaseCartItemAsync(_id))
                .then(() => {
                    setCounterCart(counterCart - 1)
                })
        }
    };

    const openCounterBlock = async () => {
        dispatch(addProductCartAsync(_id))
                .then(() => {
                    openNotification('bottomRight', 'Товар успешно добавлен в корзину');
                })

        const product = cart.find(obj => obj._id === _id);
        if(!product) {
            setCounterCart(1)
            setIsCounter(true)
        } else {
            setCounterCart(product.count + 1)
            setIsCounter(true)
        }
    }

    return ( 
        <div className={style.block_counter}>
            {
            !isCounter ? 
                <button className={style.button_create} type={type} disabled={disabled} onClick={() => button && openCounterBlock()}>{text}</button>
                :
                <div className={style.counter__block}>
                    <img className={style.image__minus} src="/assets/minus-hidden-block.svg" alt="Minus" onClick={subtractProduct} />
                    <p className={style.image__counter}>{counterCart}</p>
                    <img className={style.image__plus} src="/assets/plus-hidden-block.svg" alt="Plus" onClick={addProduct}/>
                </div>
            }
        </div>
    );
}
 
export default ButtonCreate;