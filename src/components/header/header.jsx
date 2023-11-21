
import style from './header.module.scss'
// import { Link } from 'react-router-dom'   

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
                        <p className={style.list__text}>Закладки</p>
                    </li>
                {/* </Link> */}
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>Закладки</p>
                    </li>
                {/* </Link> */}
                {/* <Link to="#"> */}
                    <li className={style.list__item}>
                        <p className={style.list__text}>Закладки</p>
                    </li>
                {/* </Link> */}
            </ul>
        </nav>
        <div>
            <button className={style.button_login}>Вход</button>
            <button className={style.button_login}>Регистрация</button>
        </div>
    </header>
  );
};

export default Header;
