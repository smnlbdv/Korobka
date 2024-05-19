/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import ContentLoader from "react-content-loader"
import { Link  } from 'react-router-dom';

import FavoriteHeart from "../favoriteHeart/favoriteHeart.jsx";
import style from './product.module.scss'


const Product = ({_id, img, title, price, preText, loading = true }) => {
    const [isAdded, setIsAdded] = useState(false)
    const [countProduct, setCountProduct] = useState()

    const { cart, addCart, increaseCartItem, decreaseCartItem, unmountItem  } = useContext(AuthContext)

    const clickBtnAdd = async () => {
        addCart(_id)
        const product = cart.find(obj => obj._id === _id);
        if(!product) {
            setCountProduct(1)
            setIsAdded(true)
        } else {
            setCountProduct(product.count + 1)
            setIsAdded(true)
        }
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
        
        <div className={!loading ? style.new_box_loader : style.new_box}>
            {
                !loading ?
                (
                    <ContentLoader 
                        speed={4}
                        width={260}
                        height={370}
                        viewBox="0 0 260 370"
                        backgroundColor="rgb(243, 243, 243, 0.5)"
                        foregroundColor="rgba(243, 243, 243, 0.26)"
                    >
                        <rect x="27" y="156" rx="5" ry="5" width="177" height="25" /> 
                        <rect x="13" y="194" rx="5" ry="5" width="220" height="64" /> 
                        <rect x="18" y="267" rx="5" ry="5" width="125" height="23" /> 
                        <rect x="23" y="4" rx="1" ry="1" width="190" height="139" /> 
                        <rect x="1" y="301" rx="12" ry="12" width="244" height="44" />
                    </ContentLoader>
                )
                :
                (
                    <>
                        <Link to={`/product/${_id}`} key={_id}>
                            <div className={style.info}>
                                <div className={style.image_box}>
                                    <img className={style.image} src={img} alt="image new" />
                                    {/* {newProduct && <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" />} */}
                                </div>
                                <div className={style.text_block}>
                                    <h2 className={style.title}>{title}</h2>
                                    <p className={style.text}>{preText}</p>
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
                            <FavoriteHeart _id={_id}/> 
                        </div>
                    </>
                )
            }
        </div>
    );
}
 
export default Product;