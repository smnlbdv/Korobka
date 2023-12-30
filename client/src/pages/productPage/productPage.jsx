import { useContext, useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import style from './productPage.module.scss'
import { AuthContext } from "../../context/authContext.js";
import CounterInput from "../../components/counterInput/counterInput.jsx";

import api from '../../api/api.js';

const ProductPage = () => {
    const [counts, setCounts] = useState(0);
    const [checkFavorites, setCheckFavorites] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({});
    const { id } = useParams();
    const { cart, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
      const token = JSON.parse(localStorage.getItem('userData')) || '';
        try {
          await api.get(`/api/products/${id}`, {
            headers: {
              'Authorization': `${token.token}`,
            }})
            .then(response => {
              if(response.status == 200) {
                setSelectedProduct(...response.data)
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
    }, [id]); 

    const getCountProduct = (_id) => { 
      cart.forEach(element => {
        if(element._id === _id) {
          setCounts(element.count)
        }
      });
    }

    const clickFavoriteIcon = () => {
      checkFavorites ? setCheckFavorites(false) : setCheckFavorites(true)
    }
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    useEffect(() => {
      getCountProduct(id)
    }, [])

    return ( 
        <section className={style.main__block_product}>
            <div className="wrapper">
              <div className={style.block__adding__product}>
                  <div className={style.product__image}>
                      <img className={style.image} src={selectedProduct.img} alt="Product image" />
                  </div>
                  <div className={style.functions__card}>
                    <div className={style.header__product}>
                      <h2 className={style.title__product}>{selectedProduct.title}</h2>
                      <img className={style.product__love} src={checkFavorites ? "/assets/product-page-love-check.svg" :  "/assets/product-page-love.svg"} alt="" onClick={clickFavoriteIcon}/>
                    </div>
                    <p className={style.price__product}>Стоимость: {selectedProduct.price} BYN</p>
                    <p className={style.quantity__product}>Кол-во товаров к корзине:{`  ${counts}`}</p>
                    <div className={style.button__add__cart}>
                      <p className={style.add__title}>Добавить в корзину: </p>
                      <CounterInput counts={counts} setCounts={setCounts} _id={id}/>
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
                <div className={style.similar__product}>
                  <p className={style.title__information}>Похожие товары</p>
                </div>
                <div className={style.review__product}>
                  <p className={style.title__information}>Отзывы</p>
                </div>
              </div>
            </div>
        </section>
     );
}
 
export default ProductPage;