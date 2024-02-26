/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom' 
import debounce from 'debounce';
import { Pagination } from 'antd';

import fetchAllBox from '../../services/PostService';
import style from './readyGifts.module.scss'
import Product from '../../components/product/product';
import { AuthContext } from '../../context/authContext';
import './ant.css'

const ReadyGifts = () => {
    const { category } = useParams()
    const [boxes, setBoxes] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const { categories } = useContext(AuthContext)

    const [valueCategory, setValueCategory] = useState()

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 20);
        }
    };

    const renderItems = () => {
        return (isLoading ? boxes : [...Array(7)] ).map((obj, index) => (
            <Product key={index} loading = {isLoading} {...obj} />
        ))
    }

    const fetchData = async (limit, page) => {
        const response = await fetchAllBox(limit, page);
        setBoxes([...response.data.products]);
        setTotalCount(response.data.total)
        scrollToTop()
        setTimeout(() => {
            setIsLoading(true)
        }, 1000)
    }

    const delayedSearch = debounce((search) => {
        setBoxes([])
        setIsLoading(false)
        fetchData(limit, page, search.toLowerCase());
    }, 500);

    const onChange = (page) => {
        setBoxes([])
        setIsLoading(false)
        fetchData(limit, page);
        setPage(page);
    };


    useEffect(() => {
        console.log("ghbdtn");
        const value = categories.find(item => item.key === category);
        setValueCategory(value.value)

        const fetch = async () => {
            await fetchData(limit, page);
        }
        fetch();
        
    }, [category])

    return (
        <section className={`${style.section_ready_gifts} wrapper`}>
            <ul className='bread-crumbs'>
                <Link to="/">
                    <li>Главная</li>
                </Link>
                <li>Готовые подарки</li>
            </ul>
            <div className={style.block__gifts}>
                <h2 className={`${style.section_title} section__title`}>
                    {
                        (category !== undefined && category !== 'all') ?
                        `Подарочные боксы "${
                            valueCategory
                        }"`
                        :
                        "Подарочные боксы"
                    }
                </h2>
            </div>
            <div className={style.search_block}>
                <div className={style.search}>
                    <img src="./assets/search.svg" alt="" />
                    <input type="text" placeholder='Поиск..' onInput={(event) => delayedSearch(event.target.value)}/>
                </div>
                <div className={style.filter_item}>
                    <img src="./assets/dollar-circle.svg" alt="" />
                    <p>Цена</p>
                </div>
            </div>
            <span className={style.span}></span>
            <div className={style.block__all__boxes}>
                {
                    renderItems()
                }
            </div>

            <div className={style.pagination}>
                <Pagination defaultCurrent={1} onChange={onChange} total={totalCount} />
            </div>
            
        </section>
    );
}
 
export default ReadyGifts;