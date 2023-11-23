/* eslint-disable react/prop-types */
import style from './newBox.module.scss'

const NewBox = ({img, title, text, price}) => {
    return ( 
        <div className={style.new_box}>
            <img className={style.favorite} src="./assets/love.svg" alt="" />
            <div className={style.info}>
                <div className={style.image_box}>
                    <img className={style.image} src={img} alt="image new" />
                    {/* <img className={style.icon_new_box} src="./assets/icon-new.svg" alt="" /> */}
                </div>
                <div className={style.text_block}>
                    <h2 className={style.title}>{title}</h2>
                    <p className={style.text}>{text}</p>
                </div>
                <div className={style.block_price}>
                    <div className={style.price}>
                        <span>Цена:</span>
                        <p>{price} BYN</p>
                    </div>
                </div>
            </div>
            <button className={style.btn_add}>В корзину</button>
        </div>
    );
}
 
export default NewBox;