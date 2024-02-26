import { useContext, useEffect, useState} from 'react';
import { Dropdown } from 'antd';

import style from './header.module.scss'
import './header.scss'
import Button from '../button/button';
import { Link  } from 'react-router-dom';

import { AuthContext } from "../../context/authContext.js";

const Header = () => {
    const { isLogin, role, userId, categories } = useContext(AuthContext)

    const getIdLink = (e) => {
        const li = e.target.closest('li')
        document.cookie = `id_category=${li.id}; expires= ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/; SameSite=None; Secure;`;
    }

    const items = categories.map((item, index) => ({
        label: (
            <Link to={`ready-gifts/${item.key}`} onClick={(event) => getIdLink(event)}>
              {item.value}
            </Link>
        ),
        key: index,
        id: item._id
    }))

    return (
        <header className={`${style.header}`}>
            <div className={`${style.header__inner} wrapper` }>
                <Link to="/" replace={true} >
                    <div className="header__logo">
                        <img className="header__image" src="/assets/logo.svg" alt="logo" />
                        <span>Коробка</span>
                    </div>
                </Link> 

                <nav className={style.navigation}>
                    <ul className={style.list__navigation}>
                        <li className={style.list__item}>
                            <Link to="#">
                                <p className={style.list__text}>Собрать</p>
                            </Link>
                        </li>
                        <li className={style.list__item}>
                            <Dropdown menu={{ items }} trigger={['click']} >
                                <p className={style.all__boxes}>Готовые подарки</p>    
                            </Dropdown>
                        </li>
                        <li className={style.list__item}>
                            <Link to="contacts">
                                <p className={style.list__text}>Контакты</p>
                            </Link>
                        </li>
                        <li className={style.list__item}>
                            <Link to="about-us">
                                <p className={style.list__text}>О нас</p>
                            </Link>
                        </li>
                    </ul>
                    </nav>
                {
                    isLogin ? 
                    <div className={style.user_nav}>
                        {
                            <ul className={style.user_list}>
                                <Link to="cart">
                                    <li className={style.list_item}>
                                        <img src="/assets/bag.svg" alt="bag logo" />
                                        <p>Корзина</p>
                                    </li>
                                </Link>
                                <Link to="liked">
                                    <li className={style.list_item}>
                                        <img src="/assets/heart.svg" alt="favorite logo" />
                                        <p>Избранное</p>
                                    </li>
                                </Link>
                                <Link to="profile">
                                    <li className={style.list_item}>
                                        <img src="/assets/user.svg" alt="user logo" />
                                        <p>Профиль</p>
                                    </li>
                                </Link>
                                {
                                    role == 1 ? 
                                    <Link to={`/api/auth/admin/${userId}`}>
                                        <button className={style.admin__btn} type="button">Админ панель</button>
                                    </Link>
                                    :
                                    ''
                                }
                            </ul>
                        }
                    </div>
                    :
                    <div className={style.buttons_block}>
                        <Button title={"Вход"} path={'/api/auth/login'}/>
                        <Button title={"Регистрация"} path={'/api/auth/registration'}/>
                    </div>
                }
            </div>
        </header>
    );
    };

export default Header;
