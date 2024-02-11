import style from './navigateAdmin.module.scss'

const NavigateAdmin = () => {
    return ( 
        <div className={style.block__navigation}>
            <p className={style.title__panel}>Админ панель</p>
            <ul>
                <li>Товар</li>
                <li>Отзывы</li>
                <li>Пользователи</li>
                <li>Email</li>
            </ul>
            <p className={style.lowtitle__panel}>2023 © Все права защищены</p>
        </div>
     );
}
 
export default NavigateAdmin;