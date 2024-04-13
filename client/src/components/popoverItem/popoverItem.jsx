import style from './popoverItem.module.scss'
import { Link  } from 'react-router-dom';

import './ant.css'
// eslint-disable-next-line react/prop-types
const PopoverItem = ({obj}) => {
    // eslint-disable-next-line react/prop-types
    const {_id, img, title, preText, price, count } = obj;
    return ( 
        <div className={style.main__block}>
            <Link to={`/product/${_id}`} key={_id}>
                <div className={style.popover__block}>
                    <div className={style.popover__image__block}>
                        <img src={img} alt="" />
                    </div>
                    <div className={style.popover__description}>
                        <p className={style.popover__title}>{title}</p>
                        <p className={style.popover__text}>{preText}</p>
                    </div>
                    <p className={style.popover__counter}>Кол-во: {count} шт.</p>
                    <p>{price} BYN</p>
                </div>
            </Link>
        </div>
     );
}
 
export default PopoverItem;