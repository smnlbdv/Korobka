import style from './cardBox.module.scss'

// eslint-disable-next-line react/prop-types
const CardBox = ({obj}) => {
    return ( 
        <div className={style.main__type_block}>
            <div className={style.main__type_image}>
                <img src={obj.photo} alt="" />
            </div>
            <h2 className={style.main__type_title}>{obj.title}</h2>
            <p className={style.main__type_price}>Цена: {obj.price} BYN</p>
            <button className={style.main__type_button}>Добавить</button>
        </div>
     );
}
 
export default CardBox;