import { useContext, useEffect, useCallback, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

import "swiper/css";
import style from "./productPage.module.scss";
import { AuthContext } from "../../context/authContext.js";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import FavoriteHeart from "../../components/favoriteHeart/favoriteHeart.jsx";

import api from "../../api/api.js";
import Review from "../../components/review/review.jsx";
import "./ant.css";

const ProductPage = () => {
  const [counts, setCounts] = useState(0);
  const [itemSlider, setItemSlider] = useState(0);
  const [isCounter, setIsCounter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [sliderProduct, setSliderProduct] = useState([]);
  const { id } = useParams();
  const { cart, logout, contextHolder, favoriteItem, scrollToTop } = useContext(AuthContext);
  const mainImage = useRef();
  const navigate = useNavigate();

  const itemsTabs = [
    {
      key: "1",
      label: "Характеристики",
      children: (
        <div className={style.text__information}>{selectedProduct.text}</div>
      ),
    },
    {
      key: "2",
      label: "Отзывы",
      children: (
        <div className={style.block__all_reviews}>
          {productReviews.length !== 0 ? (
            productReviews.map((item, index) => (
              <Review
                key={index}
                img={item.owner.avatarUser}
                name={item.owner.name}
                lastName={item.owner.surname}
                text={item.text}
                data={item.date}
                stars={item.stars}
                likes={item.likes}
                tags={item.tags}
                reviewProduct={true}
              />
            ))
          ) : (
            <div className={style.block__null__product}>
              <p>У данного товара нет отзывов</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("userData")) || "";
    try {
      await api
        .get(`/api/products/${id}`, {
          headers: {
            Authorization: `${token.token}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setSelectedProduct(...response.data);
            const copiedData = [...response.data[0].slider];
            setSliderProduct(copiedData);
          }
        })
        .catch((response) => {
          if (response.response.status == 400) {
            console.log(response);
          }
          if (response.response.status == 401) {
            logout();
            navigate("/api/auth/login");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCountProduct = () => {
    if (cart.length != 0) {
      cart.forEach((product, index) => {
        if (product._id === id) {
          setCounts(cart[index].count);
        }
      });
    }
  };

  const clickOnItem = (e) => {
    const itemSlider = document.querySelectorAll(
      `.${style.product__image_item}`
    );

    itemSlider.forEach((element, index) => {
      if (index === 0) {
        element.classList.add(style.slider__item_active);
      }
    });

    itemSlider.forEach((element) => {
      element.classList.remove(style.slider__item_active);
    });

    const parentElement = e.target.parentNode;
    parentElement.classList.add(style.slider__item_active);
    mainImage.current.src = e.target.src;
  };

  const fetchReviewsProduct = async () => {
    try {
      await api
        .get(`/api/reviews/${id}`, {})
        .then((response) => {
          if (response.status == 200) {
            const newArray = response.data;
            newArray.forEach((element, index) => {
              if (element.owner == null) {
                newArray[index].owner = {
                  avatarUser: "http://localhost:5000/avatar/default-avatar.png",
                  name: "Василий",
                  surname: "Иванкович",
                };
              }
            });

            setProductReviews(response.data);
          }
        })
        .catch((response) => {
          if (response.response.status == 400) {
            console.log(response);
          }
          if (response.response.status == 401) {
            logout();
            navigate("/api/auth/login");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchReviewsProduct();
    getCountProduct();
    scrollToTop();
  }, [favoriteItem, id]);


  return (
    <section className={style.main__block_product}>
      {contextHolder}
      <div className="wrapper">
        <div className={style.block__adding__product}>
          <div className={style.product__image}>
            <div className={style.product__image_main}>
              <img
                className={style.product__image_active}
                ref={mainImage}
                src={selectedProduct.img}
                alt="Product image"
              />
            </div>
            <div className={style.block__slider_item}>
              <Swiper
                slidesPerView={4}
                spaceBetween={25}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                on={{
                  autoplay: () => {
                    
                  }
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide className={style.swiper}>
                  <div className={style.product__image_item} id={0}>
                    <img
                      className={style.product__slider_image}
                      src={selectedProduct.img}
                      alt="Product image"
                      onClick={clickOnItem}
                    />
                  </div>
                </SwiperSlide>
                {sliderProduct.map((item, index) => (
                  <SwiperSlide className={style.swiper} key={index}>
                    <div className={style.product__image_item} id={index}>
                      <img
                        className={style.product__slider_image}
                        src={item}
                        alt="Slider image"
                        onClick={clickOnItem}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={style.functions__card}>
            <div className={style.product__header}>
              <div className={style.header__left_block}>
                <h2 className={style.title__product}>
                  {selectedProduct.title}
                </h2>
                <p className={style.price__product}>
                  {selectedProduct.price} BYN
                </p>
              </div>
              <div className={style.header__right_block}>
                <FavoriteHeart _id={id} />
              </div>
            </div>
            <p className={style.instock__product}>
              В наличии: <span>Есть</span>
            </p>
            <p className={style.text__product}>{selectedProduct.pageDesc}</p>
            <p className={style.quantity__product}>В корзине:{`  ${counts}`}</p>

            <div className={style.button__add__cart}>
              <ButtonCreate
                text={"Добавить"}
                isCounter={isCounter}
                setIsCounter={setIsCounter}
                getCountProduct={getCountProduct}
                _id={id}
              />
            </div>
            <div>
              <p className={style.title__messange}>
                Расскажите об этом товаре друзьям
              </p>
              <div className={style.share__icon}>
                <a className={style.share__icon__link} href="">
                  <img src="/assets/instagram-product.svg" alt="" />
                </a>
                <a className={style.share__icon__link} href="">
                  <img src="/assets/telegram-product.svg" alt="" />
                </a>
                <a className={style.share__icon__link} href="">
                  <img src="/assets/viber-product.svg" alt="" />
                </a>
                <a className={style.share__icon__link} href="">
                  <img src="/assets/vk-product.svg" alt="" />
                </a>
                <a className={style.share__icon__link} href="">
                  <img src="/assets/OK-product.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={style.block__information}>
          <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
