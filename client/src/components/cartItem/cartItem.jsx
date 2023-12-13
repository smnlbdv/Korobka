/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext.js";

import style from './cartItem.module.scss'

const CartItem = ({_id, img, title, text, price, count, checkAll}) => {

    const [choose, setСhoose] = useState(checkAll)
    const [counts, setCounts] = useState(count)
    const [input, setInput] = useState(false)
    const { deleteItemCart, increaseCartItem } = useContext(AuthContext)

    useEffect(() => {
        setСhoose(checkAll)
    }, [checkAll])

    const addProduct = () => {
        if(counts >= 200) {
            setCounts(counts)
        } else {
            increaseCartItem(_id)
            // setCounts(counts + 1)
        }
    }

    const subtractProduct = () => {
        if(counts <= 0) {
            setCounts(0)
        } else {
            setCounts(counts - 1)
            // calcCountItem(_id, -1)
        }
    }

    const handleChange = (e) => {
        if(e.target.value > 200) {
            setCounts(200)
        } else {
            setCounts(Number(e.target.value))
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
        deleteItemCart(_id)
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
                    <input className={style.count_input} type="text" value={counts} onChange={handleChange} onBlur={onBlurInput}/>
                    :
                    <p className={style.count} onClick={changeOnInput}>{counts}</p>
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