/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import debounce from "debounce";
import api from "../../api/api.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { CartContext } from "../../context/cartContext.js";

import CartItem from "../../components/cartItem/cartItem.jsx";
import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import Product from "../../components/product/product.jsx";

import style from "./cart.module.scss";
import './cart.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Cart = memo(function Cart() {
  const [sale, setSale] = useState({
    active: false,
    percentage: 0,
  });
  const [cartCheckAll, setCartCheckAll] = useState(false);
  const [checkArray, setCheckArray] = useState([]);
  const {
    cart,
    scrollToTop,
    logout,
    setCart,
    deleteItemCart,
    favoriteItem
  } = useContext(AuthContext);
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return sale !== 0
        ? cartTotalPrice - cartTotalPrice * (sale.percentage / 100)
        : cartTotalPrice;
}, [cartTotalPrice, sale]);

  const calculatePrice = (cart, countArray) => {
    let total = cart.reduce((accumulator, product) => {
      const subtotal = countArray * product.price;
      return accumulator + subtotal;
    }, 0);
    setCartTotalPrice(total)
  }

  const calculatePriceArray = (cart) => {
    let total = cart.reduce((accumulator, product) => {
      const subtotal = product.count * product.price;
      return accumulator + subtotal;
    }, 0);
    setCartTotalPrice(total)
  }


  // const clickCheck = () => {
  //   if (!cartCheckAll) {
  //     setCartCheckAll(true);
  //     setCheckArray([...cart]);
  //   } else {
  //     setCartCheckAll(false);
  //     setCheckArray([]);
  //   }
  // };

  useEffect(() => {
    const storedCheckArray = JSON.parse(localStorage.getItem('checkArray'));
    setCheckArray(storedCheckArray)
    if(storedCheckArray && storedCheckArray.length !== 0) {
      calculatePriceArray(storedCheckArray)
    } else {
      calculatePriceArray(cart)
    }
  }, [cart]) 

  useEffect(() => {
    if(checkArray && checkArray.length !== 0) {
      calculatePriceArray(checkArray)
    } else {
      calculatePriceArray(cart)
    }
  }, [cart, checkArray]);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);


  const delayedSearch = debounce(async (search) => {
    if(search.trim() !== '') {
        try {
        await api.post(`/api/cart/promo`, { promoCode: search })
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
      const updatedCheckArray = checkArray.filter((item) => item._id !== element._id)
      setCheckArray(updatedCheckArray);
      localStorage.setItem('checkArray', JSON.stringify(updatedCheckArray));
    });
  };


  return (
    <CartContext.Provider value={{ calculatePrice, checkArray }}>
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
            <div className={style.button__check__all} >
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
          {(checkArray && checkArray.length !== 0 && cart.length !== 0) && (
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
                {cart.map((obj) => (
                  <CartItem
                    key={obj._id}
                    calculatePrice={calculatePrice}
                    setCheckArray={setCheckArray}
                    checkArray={checkArray}
                    {...obj}
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
                    {checkArray && checkArray.length !== 0 ? checkArray.length : cart.length}{" "}
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
                      {totalPrice} BYN
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
    </CartContext.Provider>
  );
});

export default Cart;
