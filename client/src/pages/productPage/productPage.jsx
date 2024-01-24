import { useContext, useEffect, useCallback, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import style from './productPage.module.scss'
import { AuthContext } from "../../context/authContext.js";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import FavoriteHeart from "../../components/favoriteHeart/favoriteHeart.jsx";

import api from '../../api/api.js';

const ProductPage = () => {
    const [counts, setCounts] = useState(0);
    const [isCounter, setIsCounter] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [sliderProduct, setSliderProduct]= useState([]);
    const { id, userId } = useParams();
    const { cart, logout } = useContext(AuthContext);
    const mainImage = useRef()

    const navigate = useNavigate();

    console.log(selectedProduct)

    const fetchData = useCallback(async () => {
      const token = JSON.parse(localStorage.getItem('userData')) || '';
        try {
          await api.get(`/api/products/${id}/${userId}`, {
            headers: {
              'Authorization': `${token.token}`,
            },
          })
            .then(response => {
              if(response.status == 200) {
                console.log(response)
                setSelectedProduct(...response.data)

                const copiedData = [...response.data[0].slider];
                setSliderProduct(copiedData)
              } 
            })
            .catch(response => {
              console.log(response)
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
    }, [id]); 

    const getCountProduct = () => { 
      if(cart) {
        setCounts(cart.length)  
      }
    }

    // const clickFavoriteIcon = () => {
    //   checkFavorites ? setCheckFavorites(false) : setCheckFavorites(true)
    // }

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
  
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
      getCountProduct()
    }, [])

    return ( 
        <section className={style.main__block_product}>
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
                    {/* <div className={style.header__product}>
                      <h2 className={style.title__product}>{selectedProduct.title}</h2>
                      <img className={style.product__love} src={checkFavorites ? "/assets/product-page-love-check.svg" :  "/assets/product-page-love.svg"} alt="" onClick={clickFavoriteIcon}/>
                    </div> */}
                    <div className={style.product__header}>
                      <div className={style.header__left_block}>
                        <h2 className={style.title__product}>{selectedProduct.title}</h2>
                        <p className={style.price__product}>{selectedProduct.price} BYN</p>
                      </div>
                      <div className={style.header__right_block}>
                        <FavoriteHeart _id={id}  />
                      </div>
                    </div>
                    <p className={style.text__product}>
                      {selectedProduct.pretext}
                    </p>
                    <p className={style.quantity__product}>В корзине:{`  ${counts}`}</p>

                    <div className={style.button__add__cart}>
                      <div className={style.product__button__add}>
                        <ButtonCreate text={"Добавить"} isCounter={isCounter} setIsCounter={setIsCounter} counter={counts} />
                      </div>
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
                <p className={style.title__information}>Информация о товаре</p>
                <p className={style.text__information}>
                  {selectedProduct.text}
                </p>
                {/* <div className={style.similar__product}>
                  <p className={style.title__information}>Похожие товары</p>
                </div>
                <div className={style.review__product}>
                  <p className={style.title__information}>Отзывы</p>
                </div>   */}
              </div>
            </div>
        </section>
     );
}
 
export default ProductPage;