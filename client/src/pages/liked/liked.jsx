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
    const { favoriteItem, getFavorite, contextHolder } = useContext(AuthContext)

    useEffect(() => {
        if(favoriteItem.length == 0 ) {
            getFavorite()
        }
    }, [])

    return ( 
        <section className={`${style.section_cart} wrapper`}>
        {contextHolder}
            <ul className="bread-crumbs">
                <Link to="/">
                <li>Главная</li>
                </Link>
                <li>Избранное</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Избранное</h2>
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