/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext.js";

import style from './cartItem.module.scss'

const CartItem = ({id, img, title, text, price, checkAll}) => {

    const [choose, setСhoose] = useState(checkAll)
    const [count, setCount] = useState(1)
    const [input, setInput] = useState(false)

    const { deleteItemCart } = useContext(AuthContext)

    useEffect(() => {
        setСhoose(checkAll)
    }, [checkAll])

    const addProduct = () => {
        if(count >= 200) {
            setCount(count)
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
        if(e.target.value > 200) {
            setCount(200)
        } else {
            setCount(Number(e.target.value))
        }
    }

    const changeOnInput = () => {
        setInput(true)
    }

    const onBlurInput = () => {
        setInput(false)
    }

    const clickCheckButton = () => {
        setСhoose(!choose)
    }
    
    const clickDeleteButton = () => {
        deleteItemCart(id)
    }

    return ( 
        <div className={style.cart__item_block}>
            <button className={style.btn__check} onClick={clickCheckButton}>
                <img className={style.image_check} src={(choose) ? "./assets/yes-check.svg" : "./assets/no-check.svg"} alt="check" />
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
                {
                    input ?
                    <input className={style.count_input} type="text" value={count} onChange={handleChange} onBlur={onBlurInput}/>
                    :
                    <p className={style.count} onClick={changeOnInput}>{count}</p>
                }
                <button className={style.btn_counter} onClick={addProduct}>
                    <img className={style.counter_icon} src="./assets/btn-cart-plus.svg" alt="" />
                </button>
            </div>
            <p className={style.price}>{price} BYN</p>
            <button className={style.btn__delete_item}>
                <img className={style.delete_icon} src="./assets/btn-cart-delete.svg" alt="" onClick={clickDeleteButton}/>
            </button>
        </div>
     );
}
 
export default CartItem;