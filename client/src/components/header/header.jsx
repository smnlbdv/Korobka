import { useContext, useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import { Dropdown, Badge, Popover } from 'antd';
import { useAuth } from "../../hooks/auth.hook.js";

import style from './header.module.scss'
import './header.scss'
import '../../libs/ant.css'

import Button from '../button/button';
import { AuthContext } from "../../context/authContext.js";
import PopoverItem from '../popoverItem/popoverItem.jsx';

const Header = () => {
    const [countCart, setCountCart] = useState(0)
    const [items, setItems] = useState([])
    const [countFavorite, setCountFavorite] = useState(0)
    const [popoverCart, setPopoverCart] = useState([]);
    const [popoverLiked, setPopoverLiked] = useState([]);
    const { cart, categories, favoriteItem } = useContext(AuthContext)
    const { userId, role, isAuth } = useAuth();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverVisibleTwo, setPopoverVisibleTwo] = useState(false);

    const handleLinkClick = () => {
        setPopoverVisible(false);
    };

    const handleLinkClickTwo = () => {
        setPopoverVisibleTwo(false);
    };

    useEffect(() => {
        var contentCart;

        if(cart.length > 0) {
            contentCart = cart.map((element, index) => (
                <PopoverItem key={index} obj={element} />
            ));
            contentCart.push(
                <Link to="cart">
                    <div className={style.popover__button}>
                        <p>Перейти в корзину</p>
                    </div>
                </Link>
            );
            setPopoverCart(contentCart);
        } else {
            setPopoverCart(null)
        }
    }, [cart]);

    useEffect(() => {
        var contentLiked;

        if(favoriteItem.length > 0) {
            contentLiked = favoriteItem.map((element, index) => (
                <PopoverItem key={index} obj={element} />
            ));
            contentLiked.push(
                <Link to="liked">
                    <div className={style.popover__button}>
                        <p>Перейти в избранное</p>
                    </div>
                </Link>
            );
            setPopoverLiked(contentLiked);
        } else {
            setPopoverLiked(null)
        }
    }, [favoriteItem]);

    useEffect(() => {
        setCountCart(cart.length)
    }, [cart])

    useEffect(() => {
        setCountFavorite(favoriteItem.length)
    }, [favoriteItem])

    const getIdLink = (e) => {
        const li = e.target.closest('li')
        document.cookie = `id_category=${li.id}; expires= ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/; SameSite=None; Secure;`;
    }

    useEffect(() => {
        setItems(categories.map((item, index) => ({
            label: (
                <Link to={`ready-gifts/${item.key}`} onClick={(event) => getIdLink(event)}>
                  {item.value}
                </Link>
            ),
            key: index,
            id: item._id
        })))
    }, [categories])

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
                            <Link to="constructor">
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
                    isAuth ? 
                    <div className={style.user_nav}>
                        {
                            <ul className={style.user_list}>
                                
                                <Popover placement="bottomRight" content={popoverCart} onOpenChange={(visible) => setPopoverVisibleTwo(visible)} open={popoverVisibleTwo}>
                                    <Link to="cart" onClick={handleLinkClickTwo}>
                                        <li className={style.list_item}>
                                            <Badge count={countCart}>
                                                <img src="/assets/bag.svg" alt="bag logo" />
                                            </Badge>
                                            <p>Корзина</p>
                                        </li>
                                    </Link>
                                </Popover>
                                <Popover placement="bottomRight" content={popoverLiked} onOpenChange={(visible) => setPopoverVisible(visible)} open={popoverVisible}>
                                    <Link to="liked" onClick={handleLinkClick}>
                                        <li className={style.list_item}>
                                            <Badge count={countFavorite}>
                                                <img src="/assets/heart.svg" alt="favorite logo" />
                                            </Badge>  
                                            <p>Избранное</p>
                                        </li>
                                    </Link>
                                </Popover>
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
