/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom' 

import style from './readyGifts.module.scss'

const ReadyGifts = ({type}) => {
    return (
        <section className={`${style.section_ready_gifts} wrapper`}>
            <ul className='bread-crumbs'>
                <Link to="/">
                    <li>Главная</li>
                </Link>
                <li>Готовые подарки</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Готовые подарки для девушек {type}</h2>
            <div className={style.search_block}>
                <div className={style.search}>
                    <img src="./assets/search.svg" alt="" />
                    <input type="text" placeholder='Поиск..'/>
                </div>
                <div className={style.filter_item}>
                    <img src="./assets/dollar-circle.svg" alt="" />
                    <p>Цена</p>
                </div>
            </div>
            <span className={style.span}></span>
            <div>
                
            </div>
            <div>

            </div>
        </section>
    );
}
 
export default ReadyGifts;