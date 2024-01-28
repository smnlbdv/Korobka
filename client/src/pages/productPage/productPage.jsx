import { useContext, useEffect, useCallback, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from "antd";

import style from './productPage.module.scss'
import { AuthContext } from "../../context/authContext.js";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import FavoriteHeart from "../../components/favoriteHeart/favoriteHeart.jsx";

import api from '../../api/api.js';
import Review from "../../components/review/review.jsx";
import './ant.css'

const ProductPage = () => {
    const [counts, setCounts] = useState(1);
    const [isCounter, setIsCounter] = useState(false);
    const [favorite, setFavorite] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productReviews, setProductReviews] = useState([]);
    const [sliderProduct, setSliderProduct]= useState([]);
    const { id, userId } = useParams();
    const { cart, logout, contextHolder, favoriteItem, addCart } = useContext(AuthContext);
    const mainImage = useRef()
    const navigate = useNavigate();

    const itemsTabs = [
      {
        key: '1',
        label: 'Характеристики',
        children: 
        <div className={style.text__information}>
          {selectedProduct.text}
        </div>
      },
      {
        key: '2',
        label: 'Отзывы',
        children: 
        <div className={style.block__all_reviews}>
          {productReviews.map((item, index) => (
              <Review
                key={index}
                // img={}
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
          }
        </div>
        ,
      }
    ];


    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('userData')) || '';
      try {
        await api.get(`/api/products/${id}/${userId}`, {
          headers: {
            'Authorization': `${token.token}`,
          },
        })
          .then(response => {
            if(response.status == 200) {
              setSelectedProduct(...response.data)
              const copiedData = [...response.data[0].slider];
              setSliderProduct(copiedData)
            } 
          })
          .catch(response => {
            if(response.response.status == 400) {
              console.log(response)
            }
            if(response.response.status == 401) {
              logout()
              navigate("/api/auth/login");
            }
        });
      } catch (error) {
        console.log(error.message)
      }
    }

    const getCountProduct = () => { 
      if(cart.length != 0) {
        cart.forEach((product, index) => {
          if(product._id === id) {
            setCounts(cart[index].count) 
          } 
        }) 
      }
    }

    const clickOnItem = (e) => {
      const itemSlider = document.querySelectorAll(`.${style.product__image_item}`)
      
      itemSlider.forEach((element, index) => {
        if (index === 0) {
          element.classList.add(style.slider__item_active);
        }
      });

      itemSlider.forEach(element => {
        element.classList.remove(style.slider__item_active)
      });

      const parentElement = e.target.parentNode
      parentElement.classList.add(style.slider__item_active)
      mainImage.current.src = e.target.src
    }

    const addCartPage = async () => {
      await addCart({_id: selectedProduct._id, slider: selectedProduct.slider, title: selectedProduct.title, pretext: selectedProduct.pretext, price: selectedProduct.price, count: selectedProduct.count})
    }

    const fetchReviewsProduct = async () => {
      try {
        await api.get(`/api/reviews/${id}`, {
        })
          .then(response => {
            if(response.status == 200) {
              console.log(response.data)
              setProductReviews(response.data)
              console.log(productReviews)
            } 
          })
          .catch(response => {
            if(response.response.status == 400) {
              console.log(response)
            }
            if(response.response.status == 401) {
              logout()
              navigate("/api/auth/login");
            }
        });
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      if(favoriteItem.some(item => item._id === id)) {
        setFavorite(false)
      }
      fetchData();
      fetchReviewsProduct()
    }, [])

    useEffect(() => {
      getCountProduct();
    }, [cart, id]); 

    return ( 
        <section className={style.main__block_product}>
            {contextHolder}
            <div className="wrapper">
              <div className={style.block__adding__product}>
                  <div className={style.product__image}>
                      <div className={style.product__image_main}>
                        <img className={style.product__image_active} ref={mainImage} src={sliderProduct[0]} alt="Product image" />
                      </div>
                      <div className={style.block__slider_item}>
                        {sliderProduct.map((item, index) => (
                          <div className={style.product__image_item} id={index} key={index}>
                            <img className={style.product__slider_image} src={item} alt="Slider image" onClick={clickOnItem}/>
                          </div>  
                        ))}
                      </div>
                  </div>
                  <div className={style.functions__card}>
                    <div className={style.product__header}>
                      <div className={style.header__left_block}>
                        <h2 className={style.title__product}>{selectedProduct.title}</h2>
                        <p className={style.price__product}>{selectedProduct.price} BYN</p>
                      </div>
                      <div className={style.header__right_block}>
                        <FavoriteHeart _id={id} favorite={favorite} />
                      </div>
                    </div>
                    <p className={style.instock__product}>В наличии: <span>Есть</span></p>
                    <p className={style.text__product}>
                      {selectedProduct.pageDesc}
                    </p>
                    <p className={style.quantity__product}>В корзине:{`  ${counts}`}</p>

                    <div className={style.button__add__cart}>
                      <ButtonCreate text={"Добавить"} isCounter={isCounter} setIsCounter={setIsCounter} addCartPage={addCartPage} getCountProduct={getCountProduct} counter={counts} _id={id}/>
                    </div>
                    <div>
                      <p className={style.title__messange}>Расскажите об этом товаре друзьям</p>
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
                <Tabs defaultActiveKey="1"  titleFontSize={20} items={itemsTabs}></Tabs>
              </div>
            </div>
        </section>
     );
}
 
export default ProductPage;