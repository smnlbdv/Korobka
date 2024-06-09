
import style from './modalItemConstructor.module.scss'

// eslint-disable-next-line react/prop-types
const ModalItemConstructor = ({item}) => {
    return ( 
        <div className={style.main__block__modal}>
            <div className={style.modal__block__items}>
                <div className={style.modal__block__image}>
                    <img src={item.productId.photo} alt="" />
                </div>
                <div className={style.modal__block__description}>
                    <p className={style.modal__item__title}>
                    {item.productId.title}
                    </p>
                </div>
                <p className={style.modal__item__quantity}>
                    Кол-во: {item.quantity}
                </p>
                <div className={style.modal__item__price}>
                    Цена: <br></br>{item.productId.price} BYN
                </div>
            </div>
        </div>
     );
}
 
export default ModalItemConstructor;