import style from './navigateAdmin.module.scss'
import { Link  } from 'react-router-dom';

const NavigateAdmin = () => {
    return ( 
        <div className={style.block__navigation}>
            <div className={style.block__exit}>
                <Link to="http://localhost:5173/">
                    <img src="/assets/exit.svg" alt="Exit svg" />  
                </Link>
                <p className={style.title__panel}>Админ панель</p>
            </div>
            <ul>
                <Link to="">
                    <li>Главная</li>
                </Link>
                <Link to="page/users">
                    <li>Пользователи</li>
                </Link>
                <Link to="page/orders">
                    <li>Заказы</li>
                </Link>
                <Link to="product-page">
                    <li>Боксы</li>
                </Link>
                <Link to="page/product">
                    <li>Товары</li>
                </Link>
                <Link to="page/postcard">
                    <li>Открытки</li>
                </Link>
                <li>Типы коробок</li>
                <li>Отзывы</li>
                <li>Email</li>
            </ul>
            <p className={style.lowtitle__panel}>2024 © Все права защищены</p>
        </div>
     );
}
 
export default NavigateAdmin;