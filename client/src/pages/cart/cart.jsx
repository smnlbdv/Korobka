/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import debounce from "debounce";
import api from "../../api/api.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import CartItem from "../../components/cartItem/cartItem.jsx";
import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import Product from "../../components/product/product.jsx";

import style from "./cart.module.scss";
import './cart.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Cart = () => {
  const [sale, setSale] = useState({
    active: false,
    percentage: 0,
  });
  const [cartCheckAll, setCartCheckAll] = useState(false);
  const {
    cart,
    calculatePrice,
    cartTotalPrice,
    scrollToTop,
    logout,
    checkArray,
    setCheckArray,
    setCart,
    deleteItemCart,
    favoriteItem
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const clickCheck = () => {
    if (!cartCheckAll) {
      setCartCheckAll(true);
      setCheckArray([...cart]);
    } else {
      setCartCheckAll(false);
      setCheckArray([]);
    }
  };

  const delayedSearch = debounce(async (search) => {
    if(search.trim() !== '') {
        const token = JSON.parse(localStorage.getItem("userData")) || "";
        try {
        await api
            .post(
            `/api/cart/promo`,
            { promoCode: search },
            {
                headers: {
                Authorization: `${token.token}`,
                },
            }
            )
            .then((response) => {
            if (response.status === 200) {
                setSale({
                active: response.data.active,
                percentage: response.data.percentage,
                });
            }
            })
            .catch((response) => {
            if (response.response.status === 401) {
                logout();
                navigate("/api/auth/login");
            }
            if (response.response.status === 404) {
                setSale({
                active: response.response.data.active,
                percentage: 0,
                });

            }
            });
        } catch (error) {
          console.log(error.message);
        }
    }
  }, 500);

  const deleteChecket = () => {
    checkArray.forEach((element) => {
      deleteItemCart(element._id);
      setCart(cart.filter((item) => item._id !== element._id));
      setCheckArray(checkArray.filter((item) => item._id !== element._id));
    });
  };

  useEffect(() => {
    if (checkArray.length != 0) {
      calculatePrice(checkArray);
    } else {
      calculatePrice(cart);
    }
  }, [calculatePrice, cart, checkArray]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className={`${style.section_cart} wrapper`}>
      <ul className="bread-crumbs">
        <Link to="/">
          <li>Главная</li>
        </Link>
        <li>Корзина</li>
      </ul>
      <div className={style.cart__header__button}>
        <h2 className={`${style.section_title} section__title`}>Корзина</h2>
        {cart.length !== 0 && (
          <div className={style.button__check__all} onClick={clickCheck}>
            <img
              className={style.check__image}
              src={
                cartCheckAll && cart.length === checkArray.length
                  ? "/assets/cart-check-active.svg"
                  : "/assets/cart-check.svg"
              }
              alt="Cart check"
            />
            <p>Выбрать все</p>
          </div>
        )}
        {checkArray.length !== 0 && (
          <p className={style.button__delete__hidden} onClick={deleteChecket}>
            Удалить выбранное
          </p>
        )}
      </div>
      {cart.length !== 0 ? (
        <>
          <div className={style.cart__main_block}>
          <div className={style.cart__left_block}>
            <span className={style.cart__span}></span>
            <div className={style.cart__list}>
              {cart.map((obj, index) => (
                <CartItem
                  key={index}
                  {...obj}
                  checkArray={checkArray}
                  setCheckArray={setCheckArray}
                />
              ))}
            </div>
          </div>
          <div className={style.cart__right_block}>
            <h3 className={style.title}>Ваш заказ</h3>
            <div className={style.cart__info}>
              <div className={style.info__item}>
                <p>Кол-во:</p>
                <p>
                  {checkArray.length !== 0 ? checkArray.length : cart.length}{" "}
                  шт.
                </p>
              </div>
              <div className={style.info__item}>
                <p>Сумма:</p>
                <p>{cartTotalPrice} BYN</p>
              </div>
              <div className={style.info__item}>
                <p>Скидка:</p>
                <p>{sale.percentage} %</p>
              </div>
            </div>
            <input
              className={`${style.promo} ${
                sale.active == 1
                  ? style.promo__active__true
                  : sale.active == 2
                  ? style.promo__active__false
                  : ''
              }`}
              type="text"
              placeholder="Промокод..."
              onInput={(event) =>  {
                if(event.target.value.length === 0) {
                  setSale({
                      active: 0,
                      percentage: 0
                  });
                } else if(event.target.value.length > 0) {
                    delayedSearch(event.target.value);
                }
              }}
            />
            <div className={style.pay}>
              <div className={style.pay_item}>
                <p>Итог к оплате: </p>
                <p className={style.totalPrice}>
                  {" "}
                  {sale !== 0
                    ? cartTotalPrice + cartTotalPrice * (sale.percentage / 100)
                    : cartTotalPrice}{" "}
                  BYN
                </p>
              </div>
              <Link to="order">
                <button className={style.btn_checkout}>Оформить</button>
              </Link>
            </div>
          </div>
        </div>
        {
          favoriteItem.length != 0 &&
          <div className={style.liked__product__list}>
            <p className={style.liked__product__title}>Ваше избранное</p>
            {
              <div className={style.favorite_items}>
                <Swiper
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={4}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination]}
                  className={`${style.mySwiper_cart} mySwiper_cart`}
                >
                  {
                    favoriteItem.map((obj, index) => 
                      <SwiperSlide key={index}>
                        <Product
                          favorite={true}
                          {...obj}
                        />
                      </SwiperSlide>
                    )
                  }
                </Swiper>
              </div>
            }
          </div>
        }
        </>
        
      ) : (
        <div className={style.cart__block_null}>
          <div className={style.block__info}>
            <p className={style.title}>Корзина пуста</p>
            <div className={style.btn_block}>
              <ButtonNull title={"В каталог"} path={"/ready-gifts/all"} />
              <ButtonNull title={"Собрать"} path={"/"} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
