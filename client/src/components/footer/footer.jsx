import style from './footer.module.scss'

const Footer = () => {
    return ( 
        <footer className={`${style.footer} wrapper `}>
            <div className="header__logo">
                <img className="header__image" src="./assets/logo.svg" alt="logo" />
                <span>Коробка</span>
            </div>
            <p className={style.footer_text}>2023 © Все права защищены</p>
            <div className={style.contact}>
                <img src="./assets/twitter.svg" alt="" />
                <img src="./assets/telegram.svg" alt="" />
                <img src="./assets/facebook.svg" alt="" />
                <img src="./assets/youtube.svg" alt="" />
            </div>
        </footer>
     );
}
 
export default Footer;