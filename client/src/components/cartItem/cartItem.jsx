/* eslint-disable react/prop-types */

import { useState } from 'react';
import style from './cartItem.module.scss'

const CartItem = ({img, title, text, price}) => {

    const [check, setCheck] = useState(false)
    const [count, setCount] = useState(1)

    const addProduct = () => {
        if(count > 2000) {
            setCount(count - 1)
        } else {
            setCount(count + 1)
        }
    }

    const subtractProduct = () => {
        if(count <= 0) {
            setCount(0)
        } else {
            setCount(count - 1)
        }
    }

    const handleChange = (e) => {
        setCount(Number(e.target.value))
    }

    return ( 
        <div className={style.cart__item_block}>
            <button className={style.btn__check}>
                <img className={style.image_check} src={check ? "./assets/yes-check.svg" : "./assets/no-check.svg"} alt="check" />
            </button>
            <img className={style.image_product} src={img} alt="Image item" />
            <div className={style.cart__item_info}>
                <p className={style.title}>{title}</p>
                <p className={style.text}>{text}</p>
            </div>
            <div className={style.counter__block}>
                <button className={style.btn_counter} onClick={subtractProduct}>
                    <img className={style.counter_icon} src="./assets/btn-cart-minus.svg" alt="" />
                </button>
                {/* <input className={style.count} type="text" value={count} onChange={handleChange}/> */}
                <p className={style.count}>{count}</p>
                <button className={style.btn_counter} onClick={addProduct}>
                    <img className={style.counter_icon} src="./assets/btn-cart-plus.svg" alt="" />
                </button>
            </div>
            <p className={style.price}>{price} BYN</p>
            <button className={style.btn__delete_item}>
                <img className={style.delete_icon} src="./assets/btn-cart-delete.svg" alt="" />
            </button>
        </div>
     );
}
 
export default CartItem;