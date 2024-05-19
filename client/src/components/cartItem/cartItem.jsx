/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from "./cartItem.module.scss";
import CounterInput from "../counterInput/counterInput.jsx";
import { Link  } from 'react-router-dom';

const CartItem = ({ _id, img, title, preText, price, count }) => {
  const [counts, setCounts] = useState(count);
  const [cartCheck, setCartCheck] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cart,  deleteItemCart, deleteProductFavorite, addProductFavorite, favoriteItem, setCheckArray, checkArray } = useContext(AuthContext);

  const cartCheckClick = () => {
    if (!cartCheck) {
        setCartCheck(true);
        const foundItem = cart.find(item => item._id === _id);
        setCheckArray(prevArray => [...prevArray, foundItem]);
    } else {
        setCartCheck(false);
        setCheckArray(prevArray => prevArray.filter(item => item._id !== _id));
    }
  };

  const clickDeleteButton = () => {
    deleteItemCart(_id);
  };

  useEffect(() => {
    const isExist = favoriteItem.some((product) => product._id == _id);
    setIsFavorite(isExist)
  }, [_id, favoriteItem, favoriteItem.length])

  useEffect(() => {
    const isExisting = checkArray.some(item => item._id === _id);
    isExisting ? setCartCheck(true) : setCartCheck(false)
  }, [])


  const clickHeart = useCallback(() => {
    if(isFavorite) {
        deleteProductFavorite(_id);
    } else {
        addProductFavorite(_id);
    }
  }, [isFavorite, _id, deleteProductFavorite, addProductFavorite]);

  return (
    <div className={`${style.cart__item_block} ${cartCheck && style.cart__item_active}`}>
      <img className={style.check__image} src={cartCheck ? "/assets/cart-check-active.svg" : "/assets/cart-check.svg" } alt="Cart check" onClick={cartCheckClick}/>
      <Link to={`/product/${_id}`} key={_id}>
        <img className={style.image_product} src={img} alt="Image item" />
      </Link>
      <div className={style.cart__item_info}>
        <p className={style.title}>{title}</p>
        <p className={style.text}>{preText}</p>
      </div>
      <CounterInput
        counts={counts}
        setCounts={setCounts}
        _id={_id}
      />
      <p className={style.price}>{price} BYN</p>
      <div className={!isFavorite ? style.page__product_love : style.page__product_nolove} onClick={clickHeart}>
        <img className={style.favorite} src={isFavorite ? "/assets/favorite-love.svg" : "/assets/love.svg"} alt=""/>
      </div>
      <button className={style.btn__delete_item}>
        <img
          className={style.delete_icon}
          src="/assets/btn-cart-delete.svg"
          alt=""
          onClick={clickDeleteButton}
        />
      </button>
    </div>
  );
};

export default CartItem;
