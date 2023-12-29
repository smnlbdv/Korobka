import { useContext, useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import style from './productPage.module.scss'
import { AuthContext } from "../../context/authContext.js";
import CounterInput from "../../components/counterInput/counterInput.jsx";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx"

import api from '../../api/api.js';

const ProductPage = () => {
    const [counts, setCounts] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState({});
    const { id } = useParams();
    const { logout } = useContext(AuthContext);

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
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return ( 
        <section className={style.main__block_product}>
            <div className="wrapper">
              <div className={style.block__adding__product}>
                  <div className={style.product__image}>
                      <img className={style.image} src={selectedProduct.img} alt="Product image" />
                  </div>
                  <div className={style.functions__card}>
                    <h2 className={style.title__product}>{selectedProduct.title}</h2>
                    <p className={style.price__product}>{selectedProduct.price} BYN</p>
                    <p className={style.quantity__product}>Кол-во товаров к корзине: {}</p>
                    <div className={style.button__add__cart}>
                      <p className={style.add__title}>Добавить: </p>
                      <CounterInput counts={counts} setCounts={setCounts} _id={id}/>
                    </div>
                    <div className={style.favorite__block}>
                      <p className={style.title__favorite__adding}>Сохраните этот товар в закладках</p>
                      <ButtonCreate text={"Добавить"} type={""}/>
                    </div>
                    <div>
                      <p className={style.title__messange}>Расскажите об этом товаре друзьям</p>
                      <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                      </div>
                    </div>
                  </div>
              </div>
              <div className={style.block__information}>
                <p>Информация о товаре</p>
                <p>

                </p>
              </div>
            </div>
        </section>
     );
}
 
export default ProductPage;