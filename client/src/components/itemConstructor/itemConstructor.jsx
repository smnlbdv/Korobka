import { useEffect } from 'react';
import style from './itemConstructor.module.scss'

const itemConstructor = ({_id, photo, title, price, count }) => {

    return ( 
        <div className={style.constructor__item_block}>
            <div className={style.image__block}>
                <img className={style.image_product} src={photo} alt="Image item" />
            </div>
            <div className={style.header_item}>
                <p className={style.title}> {title}</p>
                <p className={style.count__product}>Кол-во: {count}</p>
            </div>
            <p className={style.price}>{price} BYN</p>
            <button className={style.btn__delete_item}>
                <img
                className={style.delete_icon}
                src="/assets/btn-cart-delete.svg"
                alt=""
                // onClick={clickDeleteButton}
                />
            </button>
        </div>
     );
}
export default itemConstructor;