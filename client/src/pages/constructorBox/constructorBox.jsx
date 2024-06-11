import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AuthContext } from "../../context/authContext.js";
import { flushSync } from "react-dom";
import * as uuid  from 'uuid';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import 'swiper/css';
import 'swiper/css/pagination';
import style from './constructorBox.module.scss'
import "../../index.scss"
import "./constructor.scss"

import { Pagination, Navigation } from 'swiper/modules';
import CardBox from '../../components/cardBox/cardBox.jsx';
import { useDispatch, useSelector } from 'react-redux';
import ItemConstructor from '../../components/itemConstructor/itemConstructor.jsx';
import debounce from 'debounce';
import api from '../../api/api.js';
import { calculatePrice, setPromoConstructor, isSimpleBox, setTotalPrice, setTitleOrder, setOrderObj } from '../../store/prefabricatedGiftSlice.js';
import { Link } from 'react-router-dom';
import ImageBox from '../../components/imageBox/imageBox.jsx';


const ConstructorBox = () => {

    const [simpleBox, setSimpleBox] = useState()
    const [boxTypes, setBoxTypes] = useState()
    const [product, setProduct] = useState()
    const [postCard, setPostCard] = useState()
    const [sale, setSale] = useState({id: null, active: null, percentage: 0,});
    const [front, setFront] = useState(false)
    const [right, setRight] = useState(false)
    const itemsPrice = useSelector(state => state.prefabricatedGift.itemsPrice)
    const { getTypesBox, getProduct, getPostCard, contexHolder } = useContext(AuthContext)
    const textRef = useRef(null);
    const dispatch = useDispatch()
    const productGift = useSelector(state => state.prefabricatedGift.product)
    const typesBox = useSelector(state => state.prefabricatedGift.typesBox)
    const postcards = useSelector(state => state.prefabricatedGift.postcards)
    const totalPrice = useSelector(state => state.prefabricatedGift.totalPrice)
    const isSimple = useSelector(state => state.prefabricatedGift.simpleBox)
    const userId = useSelector(state => state.profile.userId)
    const title = useSelector(state => state.prefabricatedGift.title)
    const openImgTypes = useRef(null)
    const openImgProduct = useRef(null)
    const openImgPostCard = useRef(null)
    const [valuePostCard, setValuePostCard] = useState("")
    const [valueProduct, setValueProduct] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [valueTypes, setValueTypes] = useState("")
    const [valuePromo, setValuePromo] = useState("")
    const [valueTitle, setValueTitle] = useState("")

    const filterProduct = product && product.filter(item => {
        return item.title.toLowerCase().includes(valueProduct.toLowerCase())
    })

    const filterPostCard = postCard && postCard.filter(item => {
        return item.title.toLowerCase().includes(valuePostCard.toLowerCase())
    })  

    const filterTypes = boxTypes && boxTypes.filter(item => {
        return item.title.toLowerCase().includes(valueTypes.toLowerCase())
    })  

    const openFront = () => {
        setFront(true)
    }

    const clearInputPromo = () => {
        setValuePromo("")
    }

    const clearInputTitle = () => {
        setValueTitle("")
    }

    const openRight = () => {
        setRight(true)
    }

    const delayedSearch = debounce(async (search) => {
        if(search.trim() !== '') {
            try {
            await api.post(`/api/cart/promo`, { promoCode: search })
                .then((response) => {
                    if (response.status === 200) {
                      setSale({
                        id: response.data.id,
                        active: response.data.active,
                        percentage: response.data.percentage,
                      });
                    }
                  })
                .catch((response) => {
                  if (response.response.status === 404) {
                    setSale({
                      active: response.response.data.active,
                      percentage: 0,
                    });
                  }
                });
            } catch (error) {
              console.log(error.message);
            }
        }
    }, 500);

    const clickConstructorButton = () => {
        const data = {
            owner: userId,
            typesBox: typesBox.map((type) => ({
                product: type._id,
                quantity: type.count
            })),
            product: productGift.map((prod) => ({
                product: prod._id,
                quantity: prod.count
            })),
            postcards: postcards.map((postcard) => ({
                product: postcard._id,
                quantity: postcard.count
            })),
            title: title || "Сборный подарок",
            image: "./assets/box-simple-box.png",
            price: totalPrice
        };

        dispatch(setOrderObj(data))
    }

    const clearInputTypes = () => {
        setValueTypes('')
    }

    const clearInputProduct = () => {
        setValueProduct('')
    }

    const clearInputPostCard = () => {
        setValuePostCard('')
    }

    useEffect(() => {
        const result = sale.active === true
          ? itemsPrice - itemsPrice * (sale.percentage / 100)
          : itemsPrice;
        
        if(sale.active) {
          dispatch(setPromoConstructor(sale));
        }
    
        dispatch(setTotalPrice(result))
        
    }, [itemsPrice, sale])

    useEffect(() => {
        dispatch(calculatePrice())
    }, [productGift, typesBox, postcards]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await getTypesBox();
                const productRes = await getProduct()
                const postCardRes = await getPostCard()

                setProduct(productRes)
                setBoxTypes(types);
                setPostCard(postCardRes)
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const containerTypes = openImgTypes.current;
        const containerProduct = openImgProduct.current;
        const containerPostCard = openImgPostCard.current;
    
        const delegate = "[data-fancybox]";
        const options = {};
    
        NativeFancybox.bind(containerTypes, delegate, options);
        NativeFancybox.bind(containerProduct, delegate, options);
        NativeFancybox.bind(containerPostCard, delegate, options);
    
        return () => {
          NativeFancybox.unbind(containerTypes);
          NativeFancybox.close();
        };
    }, []);

    useEffect(() => {
        if(isSimple) {
            setSimpleBox(true)
        } else {
            setSimpleBox(false)
        }
    }, [isSimple])

    useEffect(() => {
        if(typesBox.length !== 0 || productGift.length !== 0 || postcards.length !== 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

    }, [productGift, typesBox, postcards])

    const [images, setImages] = useState([]);

    const addImageBox = () => {
        const newImage = <ImageBox key={images.length} src={"http://localhost:5000/typesBox/box-cart-box.png"} />;
        setImages(prevImages => [...prevImages, newImage]);
    };

    const closeSides = () => {
        setFront(false);
        setRight(false);
    }

    return ( 

        <section className={`${style.section_constructor} wrapper`}>
            
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                allowTouchMove={false}
                modules={[Pagination]}
                className={`${style.customSwiper} ${simpleBox ? "mySwiper-constructor" : "mySwiper-constructor-style"}`}
            >
                <SwiperSlide className={style.customSlide}>
                    <div className={style.header__slider}>
                        <h2 className='section__title'>Коробки</h2>
                        <div className={style.search__input}>
                            <img src="/assets/search.svg" alt=""/>
                            <input type="text" placeholder='Введите название открытки' value={valueTypes} onChange={(e) => setValueTypes(e.target.value)}/>
                            <img className={style.close_icon} src="/assets/close-icon.svg" alt="Icon clear" onClick={clearInputTypes}/>
                        </div>
                    </div>
                    <div className={style.customSlide__list__types} ref={openImgTypes}>
                    {
                        filterTypes && filterTypes.reverse().map((item, index) => (
                            <CardBox key={index} obj={item} type={"boxTypes"} setSimpleBox={setSimpleBox} simpleBox={simpleBox}/>
                        ))
                    }
                    </div>
                </SwiperSlide>
                {
                    simpleBox &&
                    <SwiperSlide className={`${style.customSlide} ${style.customSlide2}`}>
                    <div className={style.three_d_box}>
                        <div className={!front ? style.front : style.front_open} onClick={openFront}>
                            {images.map(image => image)}
                            <div className={!front ? style.block_btn_create : style.block_btn_create_hidden}>
                                <button className={style.button_add} onClick={addImageBox}>Добавить фото</button>
                                <button className={style.button_add} onClick={addImageBox}>Добавить текст</button>
                            </div>
                            <div className={!front ? style.button_close : style.button_close_hidden} onDoubleClick={closeSides}>
                                <img src="/assets/close-icon-constructor.svg" alt="Close icon" />
                            </div>
                        </div>
                        <div className={style.back}></div>
                        <div className={style.left}></div>
                        <div className={!right ? style.right : style.right_open} onClick={openRight}></div>
                        <div className={style.top}></div>
                        <div className={style.bottom}></div>
                    </div>
                </SwiperSlide>
                }
                <SwiperSlide className={style.customSlide}>
                    <div className={style.header__slider}>
                        <h2 className='section__title'>Товары</h2>
                        <div className={style.search__input}>
                            <img src="/assets/search.svg" alt=""/>
                            <input type="text" placeholder='Введите название товара'  value={valueProduct} onChange={(e) => setValueProduct(e.target.value)}/> 
                            <img className={style.close_icon} src="/assets/close-icon.svg" alt="Icon clear" onClick={clearInputProduct}/> 
                        </div>
                    </div>
                    <div className={style.customSlide__list__types} ref={openImgProduct}>
                        {
                            filterProduct && filterProduct.map((item, index) => (
                                <CardBox key={index} obj={item} type={"product"}/>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>
                    <div className={style.header__slider}>
                        <h2 className='section__title'>Открытки</h2>
                        <div className={style.search__input}>
                            <img src="/assets/search.svg" alt=""/>
                            <input type="text" placeholder='Введите название открытки' value={valuePostCard} onChange={(e) => setValuePostCard(e.target.value)}/>  
                            <img className={style.close_icon} src="/assets/close-icon.svg" alt="Icon clear" onClick={clearInputPostCard}/>
                        </div>
                    </div>
                    <div className={style.customSlide__list__types} ref={openImgPostCard}>
                        {
                            filterPostCard && filterPostCard.map((item, index) => (
                                <CardBox key={index} obj={item} type={"postCard"}/>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>
                    <div className={style.check__block}>
                        {
                            (typesBox.length !== 0 || productGift.length !== 0 || postcards.length !== 0) ? (
                                <>
                                    <div className={style.block__total_price}>
                                        <h3 className={style.title}>Ваш заказ</h3>
                                        <div className={style.cart__info}>
                                            <div className={style.info__item}>
                                                <p>Кол-во:</p>
                                                <p>
                                                    {typesBox.length + productGift.length + productGift.length}{" "}
                                                    шт.
                                                </p>
                                            </div>
                                            <div className={style.info__item}>
                                                <p>Сумма:</p>
                                                <p>{itemsPrice} BYN</p>
                                            </div>
                                            <div className={style.info__item}>
                                                <p>Скидка:</p>
                                                <p>{sale.percentage} %</p>
                                            </div>
                                        </div>
                                        <div className={`${style.promo} ${
                                                    sale.active === true
                                                    ? style.promo__active__true
                                                    : sale.active === false
                                                    ? style.promo__active__false
                                                    : sale.active === null
                                                    ? ' '
                                                    : ''
                                                }`}>
                                            <input
                                                type="text"
                                                value={valuePromo}
                                                placeholder="Промокод..."
                                                onChange={(e) => {
                                                    setValuePromo(e.target.value)
                                                }}
                                                onInput={(event) =>  {
                                                    if (event.target.value.trim().length > 1) {
                                                        delayedSearch(event.target.value);
                                                    } else {
                                                        setSale({
                                                            active: null,
                                                            percentage: 0
                                                        });
                                                    }
                                                }}
                                            />
                                            <img className={style.close_icon} src="/assets/close-icon.svg" alt="Icon clear" onClick={clearInputPromo}/>
                                        </div>
                                        <div className={style.title_order}>
                                            <input
                                                type="text"
                                                value={valueTitle}
                                                placeholder="Название подарка..."
                                                onInput={(event) =>  {
                                                    dispatch(setTitleOrder(event.target.value))
                                                }}
                                                onChange={(e) => {
                                                    setValueTitle(e.target.value)
                                                }}
                                            />
                                            <img className={style.close_icon} src="/assets/close-icon.svg" alt="Icon clear" onClick={clearInputTitle}/>
                                        </div>
                                        <div className={style.pay}>
                                            <div className={style.pay_item}>
                                            <p>Итог к оплате: </p>
                                            <p className={style.totalPrice}>
                                                {totalPrice} BYN
                                            </p>
                                            </div>
                                            <Link to="/cart/order">
                                                <button className={style.btn_checkout} disabled={isDisabled} onClick={clickConstructorButton}>Оформить</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={style.customSlide__list__items}>
                                        {typesBox && typesBox.map((item, index) => (
                                            <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count} setSimpleBox={setSimpleBox}/>
                                        ))}
                                        {productGift && productGift.map((item, index) => (
                                            <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count}/>
                                        ))}
                                        {postcards && postcards.map((item, index) => (
                                            <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count}/>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className={style.null_block_constructor}>
                                    <div>
                                        <p className={style.text__big}>У вас нет добавленных товаров</p>
                                        <p className={style.text__little}>Добавьте новый товар сейчас!!</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;