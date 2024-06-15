import { useEffect, useState } from "react";
import style from "./orderConstructorItem.module.scss";

// eslint-disable-next-line react/prop-types
const OrderConstructorItem = ({_id, img, title, preText, price, count }) => {

  const [newTotalFormat, setNewTotalFormat] = useState()

  useEffect(() => {
    setNewTotalFormat(price.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}))
  }, [price])

  return (
    <div className={style.order__item_block}>
        <img className={style.image_product} src={`.${img}`} alt="Image item" />
        <div className={style.cart__item_info}>
            <p className={style.title}>{title}</p>
            <p className={style.text}>{preText}</p>
        </div>
        <p className={style.count__product}>Кол-во: {count}</p>
        <p className={style.price}>{newTotalFormat} BYN</p>
    </div>
  );
};

export default OrderConstructorItem;