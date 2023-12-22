/* eslint-disable react/prop-types */
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import api from '../../api/api.js'

import Product from "../../components/product/product.jsx";
import ButtonNull from "../../components/buttonNull/buttonNull.jsx";

import style from './liked.module.scss'


const Liked = () => {
    const { favoriteItem, logout, setFavoriteItem } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if(favoriteItem.length == 0) {
            getFavorite()
        }
    }, [])

    const getFavorite = async () => {
        const data = JSON.parse(localStorage.getItem('userData')) || '';
        try {
          await api.get(`/api/favorite/${data.userId}`, {
            headers: {
                'Authorization': `${data.token}`,
            }})
            .then(response => {
                const favorite = response.data.map(item => 
                    {
                      return {
                        ...item.product,
                      }; 
                    } 
                  );
                setFavoriteItem(favorite)
            })
            .catch(response => {
              if(response.status == 401) {
                logout()
                navigate("/api/auth/login");
              }
            })
            
        } catch (error) {
          console.log("Ошибка", error);
        }
    }
    
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
                <div className={style.favorite_items}>
                    {
                        favoriteItem.map((obj) => 
                            <Product
                                key={obj._id}
                                favorite={true}
                                {...obj}
                            />
                        )
                    }
                </div>
                :
                <div className={style.cart__block_null}>
                    <div className={style.block__info}>
                        <p className={style.title}>У вас нет понравившихся товаров</p>
                        <div className={style.btn_block}>
                            <ButtonNull title={"В каталог"} path={'/ready-gifts'}/>
                        </div>
                    </div>
                </div>
            }
        </section>
     );
}
 
export default Liked;