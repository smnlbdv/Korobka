/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import CartItem from '../../components/cartItem/cartItem.jsx'
import ButtonNull from "../../components/buttonNull/buttonNull.jsx";

import style from './cart.module.scss'


const Cart = () => {

    const [checkAll, setCheckAll] = useState(false)
    const { cart, setCart } = useContext(AuthContext)

    const clickButtonAll = () => {
        setCheckAll(!checkAll)
    }
    const clearCart = () => {
        setCart([])
    }

    return ( 
        <section className={`${style.section_cart} wrapper`}>
            <ul className="bread-crumbs">
                <Link to="/">
                <li>Главная</li>
                </Link>
                <li>Корзина</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Корзина</h2>
            {
                cart.length != 0 ?
                <div className={style.cart__main_block}>
                    <div className={style.cart__left_block}>
                        <div className={style.cart__block__buttons}>
                            <div className={style.cart__block_check}>
                                <img className={style.cart__img_check} src={checkAll ? "./assets/yes-check.svg" : "./assets/no-check.svg"} alt="check" />
                                <button className={style.cart__button_all} onClick={clickButtonAll}>Выбрать все</button>
                            </div>
                            <button className={style.cart__button_delete} onClick={clearCart}>Удалить все</button>
                        </div>
                        <span className={style.cart__span}></span>
                        <div className={style.cart__list}>
                        {
                            cart.map((obj) => 
                                <CartItem
                                    key={obj._id}
                                    checkAll={checkAll}
                                    {...obj}
                                />
                            )
                        }
                        </div>
                    </div>
                    <div className={style.cart__right_block}>
                            <h3 className={style.title}>Ваш заказ</h3>
                            <div className={style.cart__info}>
                                <div className={style.info__item}>
                                    <p>Кол-во:</p>
                                    <p>4 шт.</p>
                                </div>
                                <div className={style.info__item}>
                                    <p>Сумма:</p>
                                    <p>200 BYN</p>
                                </div>
                                <div className={style.info__item}>
                                    <p>Налог:</p>
                                    <p>1.2 %</p>
                                </div>
                            </div>
                            <input className={style.promo} type="text" placeholder="Промокод..." />
                            <div className={style.pay}>
                                <div className={style.pay_item}>
                                    <p>Итог к оплате:</p>
                                    <p>215 BYN</p>
                                </div>
                                <button className={style.btn_checkout}>Оформить</button>
                            </div>
                    </div>
                </div>
                :
                <div className={style.cart__block_null}>
                    <div className={style.block__info}>
                        <p className={style.title}>Корзина пуста</p>
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
 
export default Cart;