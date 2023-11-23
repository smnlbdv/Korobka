
import style from './header.module.scss'
import Button from '../button/button';
// import { Link } from 'react-router-dom' 


const Header = () => {

  return (
    <header className={`${style.header} wrapper`}>
        {/* <Link to="/"> */}
            <div className="header__logo">
                <img className="header__image" src="./assets/logo.svg" alt="logo" />
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
                    <li className={style.list__item}>
                        <p className={style.list__text}>Готовые подарки</p>
                    </li>
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
            <Button title={"Вход"}/>
            <Button title={"Регистрация"}/>
        </div>
    </header>
  );
};

export default Header;
