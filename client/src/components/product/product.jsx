/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Link  } from 'react-router-dom';

import FavoriteHeart from "../favoriteHeart/favoriteHeart.jsx";
import style from './product.module.scss'


const Product = ({_id, slider = [], title, price, count, favorite = false, newProduct = true, pretext }) => {

    const [isAdded, setIsAdded] = useState(false)
    const [countProduct, setCountProduct] = useState()

    const { cart, addCart, increaseCartItem, decreaseCartItem, unmountItem, userId } = useContext(AuthContext)

    const clickBtnAdd = async () => {
        await addCart({_id, slider, title, pretext, price, count})
        const product = cart.find(obj => obj._id === _id);
        if(!product) {
            setCountProduct(1)
            setIsAdded(true)
        }
        setCountProduct(product.count)
        setIsAdded(true)
    }
  
    const addProduct = () => {
        if(countProduct >= 200) {
            setCountProduct(countProduct)
        } else {
            const resultIncrease = increaseCartItem(_id)
            if(resultIncrease) { 
                setCountProduct(countProduct + 1)
            }
        }
    }

    const subtractProduct = () => {
        if(countProduct <= 1) {
            unmountItem(_id)
            setIsAdded(false)
        } else {
            const resultDeCrease = decreaseCartItem(_id)
            if(resultDeCrease) { 
                setCountProduct(countProduct - 1)
            }
        }
    }

    return (
        <div className={style.new_box}>
            <Link to={`/product/${_id}/${userId}`} key={_id}>
                <div className={style.info}>
                    <div className={style.image_box}>
                        <img className={style.image} src={slider[0]} alt="image new" />
                        {/* {newProduct && <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" />} */}
                    </div>
                    <div className={style.text_block}>
                        <h2 className={style.title}>{title}</h2>
                        <p className={style.text}>{pretext}</p>
                    </div>
                    <div className={style.block_price}>
                        <div className={style.price}>
                            <span>Цена:</span>
                            <p>{price} BYN</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={style.cart__button}>
                <div className={style.button__add_cart}>
                    {
                        isAdded ? 
                        <div className={style.counter__block}>
                            <img className={style.counter__image} src="/assets/product-cart-decrease.svg" alt="Decrease" onClick={subtractProduct}/>
                            <div className={style.counter__info}>
                                <p className={style.counter__count}>
                                    {countProduct} шт.
                                </p>
                            </div>
                            <img className={style.counter__image} src="/assets/product-cart-increase.svg" alt="Increase" onClick={addProduct}/>
                        </div>
                        :
                        <button className={style.btn_add} onClick={clickBtnAdd}>В корзину</button>
                    }
                </div>
                <FavoriteHeart _id={_id} favorite={favorite}/> 
            </div>
        </div>
    );
}
 
export default Product;