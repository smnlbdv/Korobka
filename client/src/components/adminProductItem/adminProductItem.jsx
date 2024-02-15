/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Link  } from 'react-router-dom';

// import FavoriteHeart from "../favoriteHeart/favoriteHeart.jsx";
import style from './adminProductItem.module.scss'


const AdminProductItem = ({_id, slider = [], title, price, pretext }) => {
    
    // const { cart, addCart, increaseCartItem, decreaseCartItem, unmountItem  } = useContext(AuthContext)

    // const clickBtnAdd = async () => {
    //     addCart(_id)
    //     const product = cart.find(obj => obj._id === _id);
    //     if(!product) {
    //         setCountProduct(1)
    //         setIsAdded(true)
    //     } else {
    //         setCountProduct(product.count + 1)
    //         setIsAdded(true)
    //     }
    // }
  
    // const addProduct = () => {
    //     if(countProduct >= 200) {
    //         setCountProduct(countProduct)
    //     } else {
    //         const resultIncrease = increaseCartItem(_id)
    //         if(resultIncrease) { 
    //             setCountProduct(countProduct + 1)
    //         }
    //     }
    // }

    // const subtractProduct = () => {
    //     if(countProduct <= 1) {
    //         unmountItem(_id)
    //         setIsAdded(false)
    //     } else {
    //         const resultDeCrease = decreaseCartItem(_id)
    //         if(resultDeCrease) { 
    //             setCountProduct(countProduct - 1)
    //         }
    //     }
    // }

    return (
        <div className={style.new_box}>
            <Link to={`/product/${_id}`} key={_id}>
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
                <button className={style.button}>
                    <p>Обновить продукт</p>
                </button>
                <button className={style.button}>
                    <p>Удалить продукт</p>
                </button>
            </div>
        </div>
    );
}
 
export default AdminProductItem;