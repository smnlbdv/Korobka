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
    const { favoriteItem, contextHolder, scrollToTop, setFavoriteItem, deleteProductFavorite } = useContext(AuthContext)

    useEffect(() => {
        scrollToTop();
    }, [])


    useEffect(() => {
        const favoriteList = document.querySelector(`.${style.favorite_items}`);
        if(favoriteList) {
            if (favoriteItem.length < 4) {
                favoriteList.style.justifyContent = "flex-start";
                favoriteList.style.gridTemplateColumns = "repeat(auto-fit, minmax(235px, 260px))";
            }
            if (favoriteItem.length == 0) {
                favoriteList.style.justifyContent = "center";
            }
        }
    }, [favoriteItem])

    const clearFavorite = () => {
        favoriteItem.forEach(element => {
            deleteProductFavorite(element._id)
        });
    }

    return ( 
        <section className={`${style.section_cart} wrapper`}>
        {contextHolder}
            <ul className="bread-crumbs">
                <Link to="/">
                <li>Главная</li>
                </Link>
                <li>Избранное</li>
            </ul>
            <div className={style.section_cart__header}>
                <h2 className={`${style.section_title} section__title`}>Избранное</h2>
                <p onClick={clearFavorite}>Удалить все</p>
            </div>
            {
                favoriteItem.length != 0 ?
                <div className={style.favorite_items}>
                    {
                        favoriteItem.map((obj, index) => 
                            <Product
                                key={index}
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
                            <ButtonNull title={"В каталог"} path={'/ready-gifts/all'}/>
                        </div>
                    </div>
                </div>
            }
        </section>
     );
}
 
export default Liked;