import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { Faker } from "@faker-js/faker";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "swiper/css";
import style from "./productPage.module.scss";
import { AuthContext } from "../../context/authContext.js";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import FavoriteHeart from "../../components/favoriteHeart/favoriteHeart.jsx";

import api from "../../api/api.js";
import Review from "../../components/review/review.jsx";
import "./swiper.css"
import ButtonReview from "../../components/buttonReview/buttonReview.jsx";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const [counterCart, setCounterCart] = useState(0);
  const [isCounter, setIsCounter] = useState(false);
  const [hiddenButton, setHiddenButton] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const { id } = useParams();
  const openBlock = useRef()
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { logout, contextHolder, favoriteItem, scrollToTop } = useContext(AuthContext);
  const mainImage = useRef();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart)
  const order = useSelector(state => state.profile.order)

  useEffect(() => {
    if(selectedProduct.count == 0) {
      setIsDisabled(true)
    }
  }, [selectedProduct.count])

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
                id = {item._id}
                key={index}
                img={item.owner.avatarUser}
                name={item.owner.name}
                lastName={item.owner.surname}
                text={item.text}
                data={item.date}
                stars={item.stars}
                likes={item.likes}
                reviewProduct={true}
                slider={item.slider}
                comment={item.comment}
                hidden = {true}
                isComment={true}
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
    try {
      await api.get(`/api/products/${id}`)
        .then((response) => {
          if (response.status == 200) {
            setSelectedProduct(...response.data);
          }
        })
        .catch((response) => {
          console.log(response.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCountProduct = () => {
    if (cart.length != 0) {
      cart.forEach((product, index) => {
        if (product._id === id) {
          setCounterCart(cart[index].count);
        }
      });
    }
  };

  const fetchReviewsProduct = async () => {
    try {
      await api
        .get(`/api/reviews/${id}`, {})
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            setProductReviews(response.data);
          }
        })
        .catch((response) => {
          console.log(response.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchReviewsProduct();
    getCountProduct();

    const result = order.some(orderItem => 
      orderItem.items.some(item => item.productId._id === id)
    );

    setHiddenButton(result)

  }, []);

  useEffect(() => {
    const isExist = favoriteItem.some((product) => product._id == id);
    setIsFavorite(isExist)
  }, [])

  useEffect(() => {
    const container = openBlock.current;

    const delegate = "[data-fancybox]";
    const options = {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };

}, []);

  return (
    <section className={style.main__block_product}>
      {contextHolder}
      <div className="wrapper">
        <div className={style.block__adding__product}>
          <div className={style.product__image}>
            <div className={style.product__image_main } ref={openBlock}>
              <img
                  className={style.product__image_active}
                  ref={mainImage}
                  src={selectedProduct.img}
                  alt="Product image"
                />
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
                <FavoriteHeart _id={id} favorite={isFavorite}/>
              </div>
            </div>
            <p className={style.instock__product}>
              В наличии:
              {
                selectedProduct.count >= 50 ?
                <span className={style.instock__product_yes}>Есть</span>
              : selectedProduct.count < 50 && selectedProduct.count > 0 ?
                <span className={style.instock__product_past}>Меньше половины</span>
              : selectedProduct.count === 0 &&
                <span className={style.instock__product_null}>Нет в наличии</span>
              }
            </p>
            <p className={style.text__product}>{selectedProduct.pageDesc}</p>
            <p className={style.quantity__product}>В корзине:{`  ${counterCart}`}</p>

            <div className={style.button__add__cart}>
              <ButtonCreate
                disabled={isDisabled}
                text={"Добавить"}
                isCounter={isCounter}
                setIsCounter={setIsCounter}
                setCounterCart = {setCounterCart}
                counterCart = {counterCart}
                getCountProduct={getCountProduct}
                button = {true}
                _id={id}
              />
              {
                hiddenButton && 
                <ButtonReview id={id} />
              }
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
        <div className={`${style.block__information} tabs`}>
          <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
