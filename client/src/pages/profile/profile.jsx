/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

// import CartItem from '../../components/cartItem/cartItem.jsx'
// import ButtonNull from "../../components/buttonNull/buttonNull.jsx";

import style from './profile.module.scss'

const Profil = () => {

    const [checkAll, setCheckAll] = useState(false)
    const [totalPrice, setPriceTotal] = useState()
    const { cart, setCart, cartPrice, calculatePrice, getCart } = useContext(AuthContext)

    return ( 
        <section className={`${style.section_profile} wrapper`}>
            <ul className="bread-crumbs">
                <Link to="/">
                <li>Главная</li>
                </Link>
                <li>Профиль</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Профиль</h2>
            
            <form className={style.block__user}>
                <div className={style.header__block}>
                    <div className={style.update__image__block}>
                        <img src="http://localhost:5000/avatar.jpg" alt="" />
                    </div>
                    <div>
                        <p className={style.fullname__name}>Семён Лебедев</p>
                        <p className={style.user__status}>Активный пользователь</p>
                    </div>
                    <button className={`${style.button__header__block} ${style.button__add__photo}`}>Добавить фото</button>
                    <button className={`${style.button__header__block} ${style.button__delete__photo}`}>Удалить фото </button>
                </div>
                <div className={style.fullname__block}>

                </div>
                <div className={style.nickname__block}>

                </div>
                <div className={style.email__block}>

                </div>
                <div className={style.reset_password__block}>

                </div>
                <div className={style.repeate_password__block}>

                </div>
                <button>Сохранить</button>
            </form>

            <div className={style.block__order}>
                <h3>Мои заказы</h3>
                <div>
                    
                </div>
            </div>   

        </section>
     );
}
 
export default Profil;