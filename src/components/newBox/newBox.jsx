/* eslint-disable react/prop-types */
import style from './newBox.module.scss'

const NewBox = ({img, title, text, price}) => {
    return ( 
        <div className={style.new_box}>
            <div className={style.info}>
                <div className={style.image_box}>
                    <img className={style.image} src={img} alt="image new" />
                    <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" />
                </div>
                <h2 className={style.title}>{title}</h2>
                <p className={style.text}>{text}</p>
                <div className={style.block_price}>
                    <div className={style.price}>
                        <span>Цена:</span>
                        <p>{price} BYN</p>
                    </div>
                    <img className={style.favorite} src="./assets/love.svg" alt="" />
                </div>
            </div>
            <button className={style.btn_add}>В корзину</button>
        </div>
    );
}
 
export default NewBox;