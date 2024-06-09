import { useEffect } from 'react';
import style from './itemConstructor.module.scss'
import { useDispatch } from 'react-redux';
import { deleteItemConstructor } from '../../store/prefabricatedGiftSlice';

const itemConstructor = ({_id, photo, title, price, count }) => {

    const dispatch = useDispatch()

    const clickDeleteButton = () => {
        dispatch(deleteItemConstructor(_id))
    }

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
                    src="/assets/close-square.svg"
                    alt=""
                    onClick={clickDeleteButton}
                />
            </button>
        </div>
     );
}
export default itemConstructor;