import { useContext } from 'react';
import style from './header.module.scss'
import Button from '../button/button';
import { Link   } from 'react-router-dom';

import { AuthContext } from "../../context/authContext.js";

const Header = () => {
    
  const { isLogin } = useContext(AuthContext)

  return (
    <header className={`${style.header} wrapper`}>
        <Link to="/" replace={true} >
            <div className="header__logo">
                <img className="header__image" src="./assets/logo.svg" alt="logo" />
                <span>Коробка</span>
            </div>
        </Link> 
        <nav className={style.navigation}>
            <ul className={style.list__navigation}>
                
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>Собрать</p>
                    </li>
                {/* </Link> */}
                <Link to="ready-gifts" replace={true} >
                    <li className={style.list__item}>
                        <p className={style.list__text}>Готовые подарки</p>
                    </li>
                </Link>
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>Контакты</p>
                    </li>
                {/* </Link> */}
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>О нас</p>
                    </li>
                {/* </Link> */}
            </ul>
        </nav>
        {
            isLogin ? 
            <div className={style.user_nav}>
                <ul className={style.user_list}>
                    <li className={style.list_item}>
                        <img src="./assets/bag.svg" alt="bag logo" />
                        <p>0 руб.</p>
                    </li>
                    <li className={style.list_item}>
                        <img src="./assets/heart.svg" alt="favorite logo" />
                        <p>Закладки</p>
                    </li>
                    <li className={style.list_item}>
                        <img src="./assets/user.svg" alt="user logo" />
                        <p>Профиль</p>
                    </li>
                </ul>
            </div>
            :
            <div className={style.buttons_block}>
                <Button title={"Вход"} path={'/api/auth/login'}/>
                <Button title={"Регистрация"} path={'/api/auth/registration'}/>
            </div>
        }
    </header>
  );
};

export default Header;
