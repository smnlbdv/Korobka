/* eslint-disable react/prop-types */
import { useEffect } from "react";
import style from "./orderItem.module.scss";
import { Link  } from 'react-router-dom';

const CartItemOrder = ({_id, img, title, preText, price, count }) => {

  return (
    <Link to={`/product/${_id}`} key={_id}>
      <div className={style.order__item_block}>
        <img className={style.image_product} src={img} alt="Image item" />
        <div className={style.cart__item_info}>
            <p className={style.title}>{title}</p>
            <p className={style.text}>{preText}</p>
        </div>
        <p className={style.count__product}>Кол-во: {count}</p>
        <p className={style.price}>{price} BYN</p>
      </div>
    </Link>
  );
};

export default CartItemOrder;
