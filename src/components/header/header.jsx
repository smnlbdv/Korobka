
import style from './header.module.scss'
import './header.css'
import { Dropdown, Space } from 'antd';
// import { Link } from 'react-router-dom' 


const items = [
    {
        label: <a  href="#">Для мужчин</a>,
        key: '0',
    },
    {
        label: <a href="#">На 14 февраля</a>,
        key: '1',
    },
    {
        label: <a href="#">Для девушек</a>,
        key: '2',
    },
    
];


const Header = () => {

  return (
    <header className={style.header}>
        {/* <Link to="/"> */}
            <div className={style.header__logo}>
                <img className={style.header__image} src="./assets/logo.svg" alt="logo" />
                <span>Коробка</span>
            </div>
        {/* </Link>  */}
        <nav className={style.navigation}>
            <ul className={style.list__navigation}>
                
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>Собрать</p>
                    </li>
                {/* </Link> */}
                {/* <Link to="#"> */}
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Готовые подарки
                        </Space>
                    </a>
                </Dropdown>
                {/* </Link> */}
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
        <div className={style.buttons_block}>
            <button className={style.button_login}>Вход</button>
            <button className={style.button_login}>Регистрация</button>
        </div>
    </header>
  );
};

export default Header;
