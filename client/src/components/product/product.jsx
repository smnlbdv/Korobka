/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from './product.module.scss'


const Product = ({_id, img, title, text, price, count, favorite = false}) => {

    const [isFavorite, setIsFavorite] = useState(favorite);

    const { addCart, addProductFavorite } = useContext(AuthContext)

    const clickBtnAdd = () => {
        addCart({_id, img, title, text, price, count})
    }

    const clickHeart = () => {
        addProductFavorite(_id) ? setIsFavorite(true) : setIsFavorite(false)
    }

    return (
        <div className={style.new_box}>
            <img className={style.favorite} src={isFavorite ? "./assets/favorite-love.svg" : "./assets/love.svg"} alt="" onClick={clickHeart}/>
            <div className={style.info}>
                <div className={style.image_box}>
                    <img className={style.image} src={img} alt="image new" />
                    {/* <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" /> */}
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
            <button className={style.btn_add} onClick={clickBtnAdd}>В корзину</button>
        </div>
    );
}
 
export default Product;