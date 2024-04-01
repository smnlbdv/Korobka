/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from "./cartItem.module.scss";
import CounterInput from "../counterInput/counterInput.jsx";
import { Link  } from 'react-router-dom';

const CartItem = ({ _id, img, title, preText, price, count, checkArray, setCheckArray }) => {
  const [counts, setCounts] = useState(count);
  const [cartCheck, setCartCheck] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cart,  deleteItemCart, deleteProductFavorite, addProductFavorite, favoriteItem } = useContext(AuthContext);

  const cartCheckClick = () => {
    if(!cartCheck) {
      const foundItem = cart.find(item => item._id === _id);
      if(foundItem) {
        setCheckArray(prevArray => [...prevArray, foundItem])
        setCartCheck(true)
      }
    } else {
      setCheckArray(checkArray.filter(item => item._id !== _id))
      setCartCheck(false)
    }
    console.log(checkArray);
  }

  const clickDeleteButton = () => {
    deleteItemCart(_id);
  };

  useEffect(() => {
    const isExist = favoriteItem.some((product) => product._id == _id);
    setIsFavorite(isExist)
  }, [cart])

  useEffect(() => {
    const isExisting = checkArray.some(item => item._id === _id);
    isExisting ? setCartCheck(true) : setCartCheck(false)
  }, [_id, checkArray])


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
        cartCheck={cartCheck}
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
