import { useContext} from 'react';
import { Dropdown, Space } from 'antd';

import style from './header.module.scss'
import './header.scss'
import Button from '../button/button';
import { Link  } from 'react-router-dom';

import { AuthContext } from "../../context/authContext.js";

const Header = () => {
    
    const items = [
        {
          label: <Link to="ready-gifts">
                    <li>Для мужчин</li>
                 </Link>,
          key: '0',
        },
        {
          label: <Link to="ready-gifts">
                    <li>На 14 февраля</li>
                 </Link>,
          key: '1',
        },
        {
          label: <Link to="ready-gifts">
                    <li>Для девушек</li>
                 </Link>,
          key: '2',
        },
      ];
      
  const { isLogin } = useContext(AuthContext)

  return (
    <header className={`${style.header}`}>
        <div className={`${style.header__inner} wrapper` }>
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
                    <li className={style.list__item}>
                        <Dropdown
                            menu={{
                            items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <p>Готовые подарки</p>
                                </Space>    
                            </a>
                        </Dropdown>
                    </li>
                    <Link to="contacts">
                        <li className={style.list__item}>
                            <p className={style.list__text}>Контакты</p>
                        </li>
                    </Link>
                    <Link to="about-us">
                        <li className={style.list__item}>
                            <p className={style.list__text}>О нас</p>
                        </li>
                    </Link>
                </ul>
            </nav>
            {
                isLogin ? 
                <div className={style.user_nav}>
                    <ul className={style.user_list}>
                        <Link to="cart">
                            <li className={style.list_item}>
                                <img src="./assets/bag.svg" alt="bag logo" />
                                <p>Корзина</p>
                            </li>
                        </Link>
                        <Link to="liked">
                            <li className={style.list_item}>
                                <img src="./assets/heart.svg" alt="favorite logo" />
                                <p>Избранное</p>
                            </li>
                        </Link>
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
        </div>
    </header>
  );
};

export default Header;
