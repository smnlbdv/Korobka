/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from './product.module.scss'


const Product = ({_id, img, title, text, price, count, favorite = false, newProduct = true}) => {

    const [isFavorite, setIsFavorite] = useState(favorite);

    const { addCart, addProductFavorite, deleteProductFavorite } = useContext(AuthContext)

    const clickBtnAdd = () => {
        addCart({_id, img, title, text, price, count})
    }

    const clickHeart = () => {
        if(isFavorite) {
            deleteProductFavorite(_id)
            setIsFavorite(false)
        } else {
            addProductFavorite(_id) 
            setIsFavorite(true)
        }
    }

    return (
        <div className={style.new_box}>
            <div className={style.info}>
                <div className={style.image_box}>
                
                    <img className={style.image} src={img} alt="image new" />
                    {newProduct && <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" />}
                </div>
                <div className={style.text_block}>
                    <h2 className={style.title}>{title}</h2>
                    <p className={style.text}>{text}</p>
                </div>
                <div className={style.block_price}>
                    <div className={style.price}>
                        <span>Цена:</span>
                        <p>{price} BYN</p>
                    </div>
                </div>
            </div>
            <div className={style.cart__button}>
                <div className={style.button__add_cart}>
                    <button className={style.btn_add} onClick={clickBtnAdd}>В корзину</button>
                </div>
                <div className={!isFavorite ? style.button__add_favorite : style.button__add_favorite_love}>
                    <img className={style.favorite} src={isFavorite ? "./assets/favorite-love.svg" : "./assets/love.svg"} alt="" onClick={clickHeart}/>
                </div>
            </div>
        </div>
    );
}
 
export default Product;