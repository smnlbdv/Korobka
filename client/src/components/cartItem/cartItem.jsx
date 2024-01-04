/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from "./cartItem.module.scss";
import CounterInput from "../counterInput/counterInput.jsx";

const CartItem = ({ _id, img, title, pretext, price, count, checkAll }) => {
  const [choose, setСhoose] = useState(checkAll);
  const [counts, setCounts] = useState(count);
  const { deleteItemCart } = useContext(AuthContext);

  useEffect(() => {
    setСhoose(checkAll);
  }, [checkAll]);

  const clickCheckButton = () => {
    setСhoose(!choose);
  };

  const clickDeleteButton = () => {
    deleteItemCart(_id);
  };

  return (
    <div className={style.cart__item_block}>
      <button className={style.btn__check} onClick={clickCheckButton}>
        <img
          className={style.image_check}
          src={choose ? "/assets/yes-check.svg" : "/assets/no-check.svg"}
          alt="check"
        />
      </button>
      <img className={style.image_product} src={img} alt="Image item" />
      <div className={style.cart__item_info}>
        <p className={style.title}>{title}</p>
        <p className={style.text}>{pretext}</p>
      </div>
      <CounterInput
        counts={counts}
        setCounts={setCounts}
        _id={_id}
      />
      <p className={style.price}>{price} BYN</p>
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
