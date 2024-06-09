/* eslint-disable react/prop-types */
// import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from 'antd';

// import { AuthContext } from "../../context/authContext.js";

import style from "./profileOrderConstructor.module.scss";
// import './ant.css'
// import { useDispatch } from "react-redux";
// import { deleteOrderItemAsync } from "../../store/profileSlice.js";

const ProfileOrderConstructor = ({_id, wayPay, totalAmount, address, status, image, onClick }) => {
    // const [urlCheck, setUrlCheck] = useState("")
    // const urlCheckLink = useRef()
    // const [widthMultiplier, setWidthMultiplier] = useState()
    // const { postCheckOrder, openNotification } = useContext(AuthContext);
    // const dispatch = useDispatch()

    // const clickDeleteOrder = () => {
    //     dispatch(deleteOrderItemAsync(_id))
    //             .then((response) => {
    //                 openNotification('bottomRight', response.payload.message)
    //             })
    // }
    // const clickCheckOrder = async (e) => {
    //     e.preventDefault();
    //     let timeoutId;
    //     try {
    //         const response = await postCheckOrder(_id);
    //         if (response) {
    //             setUrlCheck(response)
    //             timeoutId = setTimeout(() => {
    //                 urlCheckLink.current.click();
    //             }, 200)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return () => clearTimeout(timeoutId);
    // };

    const clickItem = () => {
        onClick(_id)
    }

    return (
        <div className={style.order__item_block}>
            <div className={style.order__click__block} onClick={clickItem}>
                <div className={style.order__images}>
                    <div className={style.image__block}>
                        <img 
                            className={style.image_product} 
                            src={image} 
                            alt="Image order"
                        />
                    </div>
                </div>
                <div className={style.list__info__order}>
                    <p><b>Адрес:</b> {address}</p>
                    <p><b>Способ оплаты:</b> {wayPay.name}</p>
                </div>
                
                <p className={style.price}>{totalAmount} BYN</p>
                <span className={style.order__item__status}>{status.name}</span>
            </div>
            <div>
                <Tooltip placement="right" title={"Удалить"} color={"red"}>
                    <button className={style.btn__delete_order}>
                        <img
                            className={style.delete_icon}
                            src="/assets/btn-cart-delete.svg"
                            alt=""
                            // onClick={clickDeleteOrder}
                        />
                    </button>
                </Tooltip>
                <Tooltip placement="right" title={"Чек"} color={"red"}>
                    <a className={style.btn__check_order} target="_blank" rel="noreferrer">
                                                                                            {/* href={urlCheck} ref={urlCheckLink} */}
                        <img
                            className={style.delete_icon}
                            src="/assets/btn-cart-check.svg"
                            alt=""
                            // onClick={clickCheckOrder}
                        />
                    </a>
                </Tooltip>
            </div>
        </div>
  );
};

export default ProfileOrderConstructor;