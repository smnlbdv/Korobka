import style from './footer.module.scss'

const Footer = () => {
    return ( 
        <footer className={`${style.footer} wrapper `}>
            <div className={style.footer__inner}>
                <div className="header__logo">
                    <img className="header__image" src="./assets/logo.svg" alt="logo" />
                    <span>Коробка</span>
                </div>
                <p className={style.footer_text}>2023 © Все права защищены</p>
                <div className={style.contact}>
                    <a href="https://twitter.com/?lang=en" target="blank">
                        <img src="./assets/twitter.svg" alt="" />
                    </a>
                    <a href="https://web.telegram.org/" target="blank">
                        <img src="./assets/telegram.svg" alt="" />
                    </a>
                    <a href="https://ru-ru.facebook.com/" target="blank">
                        <img src="./assets/facebook.svg" alt="" />
                    </a>
                    <a href="https://www.youtube.com/" target="blank">
                        <img src="./assets/youtube.svg" alt="" />
                    </a>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;