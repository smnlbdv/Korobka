/* eslint-disable react/prop-types */
import { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import ButtonNull from "../../components/buttonNull/buttonNull.jsx";

import style from './liked.module.scss'


const Liked = () => {
    const { favoriteItem } = useContext(AuthContext)
    
    return ( 
        <section className={`${style.section_cart} wrapper`}>
            <ul className="bread-crumbs">
                <Link to="/">
                <li>Главная</li>
                </Link>
                <li>Закладки</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Закладки</h2>
            {
                favoriteItem.length != 0 ?
                <div>
                    <p>Гуд!</p>
                </div>
                :
                <div className={style.cart__block_null}>
                    <div className={style.block__info}>
                        <p className={style.title}>У вас нет понравившихся товаров</p>
                        <div className={style.btn_block}>
                            <ButtonNull title={"В каталог"} path={'/ready-gifts'}/>
                            <ButtonNull title={"Собрать"} path={'/'}/>
                        </div>
                    </div>
                </div>
            }
        </section>
     );
}
 
export default Liked;