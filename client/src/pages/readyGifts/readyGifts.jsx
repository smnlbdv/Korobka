/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom' 

import fetchAllBox from '../../services/PostService';

import style from './readyGifts.module.scss'

import { Pagination } from 'antd';
import Product from '../../components/product/product';
import './ant.css'

const ReadyGifts = ({type = null}) => {

    const [boxes, setBoxes] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const fetchData = async (limit, page) => {
        const response = await fetchAllBox(limit, page);
        setBoxes([...response.data.products]);
        setTotalCount(response.data.total)
        // setTotalCount(response.totalCount); // Предположим, что в ответе также содержится общее количество записей
    }

    const onChange = (page) => {
        fetchData(limit, page);
    };
    
    useEffect(() => {
        const fetch = async () => {
            await fetchData(limit, page);
        }
        fetch();
    }, []);

    return (
        <section className={`${style.section_ready_gifts} wrapper`}>
            <ul className='bread-crumbs'>
                <Link to="/">
                    <li>Главная</li>
                </Link>
                <li>Готовые подарки</li>
            </ul>
            {
                type !== null ?
                <h2 className={`${style.section_title} section__title`}>
                    {type}
                </h2>
                :
                <h2 className={`${style.section_title} section__title`}>
                    Подарочные боксы
                </h2>
            }
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
            <div className={style.block__all__boxes}>
                {boxes.map((obj, index) => (
                    <Product key={index} {...obj} />
                ))}
            </div>

            <div className={style.pagination}>
                <Pagination defaultCurrent={1} onChange={onChange} total={totalCount} />
            </div>
            
        </section>
    );
}
 
export default ReadyGifts;