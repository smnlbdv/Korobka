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
          label: (
            <Link to="ready-gifts">
              Для мужчин
            </Link>
          ),
          key: '0',
        },
        {
          label: (
            <Link to="ready-gifts">
              На 14 февраля
            </Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to="ready-gifts">
              Для девушек
            </Link>
          ),
          key: '2',
        },
      ];
      
  const { isLogin, role, userId } = useContext(AuthContext)

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
                        <Dropdown menu={{ items }} trigger={['hover']}>
                            <Link to="ready-gifts">
                                <Space>
                                    <p className={style.all__boxes}>Готовые подарки</p>
                                </Space>    
                            </Link>
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
