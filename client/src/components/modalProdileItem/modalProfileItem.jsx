
import { Link } from "react-router-dom";

import ButtonReview from "../../components/buttonReview/buttonReview.jsx";

import style from './modalProfileItem.module.scss'

// eslint-disable-next-line react/prop-types
const ModalProfileItem = ({item}) => {
    return ( 
        <div className={style.main__block__modal}>
            <Link to={`/product/${item.productId._id}`}>
                <div className={style.modal__block__items}>
                <div className={style.modal__block__image}>
                    <img src={item.productId.img} alt="" />
                </div>
                <div className={style.modal__block__description}>
                    <p className={style.modal__item__title}>
                    {item.productId.title}
                    </p>
                    <p className={style.modal__item__description}>
                    {item.productId.preText}
                    </p>
                </div>
                <p className={style.modal__item__quantity}>
                    Кол-во: {item.quantity}
                </p>
                <div className={style.modal__item__price}>
                    Цена: <br></br>{item.productId.price} BYN
                </div>
                </div>
            </Link>
            <ButtonReview id={item.productId._id}/>
        </div>
     );
}
 
export default ModalProfileItem;