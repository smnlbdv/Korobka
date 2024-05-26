import style from './itemPay.module.scss'

// eslint-disable-next-line react/prop-types
const ItemPay = ({image, alt}) => {
    return ( 
        <div className={style.block__pay__image}>
            <img className={style.pay__image} src={"http://localhost:5000/pay/" + image} alt={alt} />
        </div>
     );
}
export default ItemPay;