/* eslint-disable react/prop-types */
import { useContext } from "react";

import { AuthContext } from "../../context/authContext.js";

import style from "./profileOrederItem.module.scss";

const ProfileOrderItem = ({_id, groupImage, wayPay, totalAmount, address, status, onClick }) => {

    const { deleteOrderItem } = useContext(AuthContext);

    const clickDeleteOrder = () => {
        deleteOrderItem(_id)
    }

    const widthMultiplier = groupImage.length > 3 ? 200 : 55 * groupImage.length;


    return (
        <div className={style.order__item_block} onClick={onClick}>
            <div className={style.order__images} style={ { width: widthMultiplier + 'px' } }>
            {
                groupImage.map((item, index) => (
                    index < 3 ? (
                        <div className={style.image__block} key={index}>
                            <img 
                            className={style.image_product} 
                            src={item.productId.img} 
                            style={{ transform: `translateX(${index * -40}px)` }} 
                            alt="Image order"/>
                        </div>
                    ) : index === 3 ? (
                        <div key={index} className={style.block__count}>
                            <p className={style.countOrder}>
                                +{groupImage.length - 3}
                            </p>
                        </div>
                    ) : null
                ))
            }
            </div>
            <div className={style.list__info__order}>
                <p><b>Адрес:</b> {address}</p>
                <p><b>Способ оплаты:</b> {wayPay}</p>
            </div>
            <p className={style.count__product}>Кол-во: {groupImage.length}</p>
            <p className={style.price}>{totalAmount} BYN</p>
            <span className={style.order__item__status}>{status}</span>
            <button className={style.btn__delete_order}>
                <img
                className={style.delete_icon}
                src="/assets/btn-cart-delete.svg"
                alt=""
                onClick={clickDeleteOrder}
                />
            </button>
        </div>
  );
};

export default ProfileOrderItem;
