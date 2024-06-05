import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AuthContext } from "../../context/authContext.js";
import Moveable from "react-moveable";
import { flushSync } from "react-dom";
import keycon from "keycon";

keycon.setGlobal();

import 'swiper/css';
import 'swiper/css/pagination';
import style from './constructorBox.module.scss'
import "../../index.scss"
import "./constructor.scss"

import { Pagination, Navigation } from 'swiper/modules';
import CardBox from '../../components/cardBox/cardBox.jsx';
import { useSelector } from 'react-redux';
import ItemConstructor from '../../components/itemConstructor/itemConstructor.jsx';


const ConstructorBox = () => {

    const [simpleBox, setSimpleBox] = useState(false)
    const [boxTypes, setBoxTypes] = useState()
    const [product, setProduct] = useState()
    const [postCard, setPostCard] = useState()
    const [front, setFront] = useState(false)
    const [right, setRight] = useState(false)
    const { getTypesBox, getProduct, getPostCard, contexHolder } = useContext(AuthContext)
    const textRef = useRef(null);
    const productGift = useSelector(state => state.prefabricatedGift.product)
    const typesBox = useSelector(state => state.prefabricatedGift.typesBox)
    const postcards = useSelector(state => state.prefabricatedGift.postcards)

    const openFront = () => {
        setFront(true)
    }

    const openRight = () => {
        setRight(true)
    }

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

    const clickToConstructor = () => {
        setSimpleBox(!simpleBox)
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
                    <div className={style.customSlide__list__types}>
                        <div className={style.main__type_block}>
                            <div className={style.main__type_image}>
                                <img src="./assets/box-simple-box.png" alt="Simple box" />
                            </div>
                            <h2 className={style.main__type_title}>Простая коробка</h2>
                            <p className={style.main__type_price}>Цена: 10 BYN</p>
                            <div className={style.button__add_cart}>
                                <button className={!simpleBox ? style.main__type_button : style.main__type_button_del} onClick={clickToConstructor}>
                                    {
                                        simpleBox ?
                                        <p>Удалить</p>
                                        :
                                        <p>Стилизовать</p>
                                    }
                                </button>
                            </div>
                        </div>
                    {
                        boxTypes && boxTypes.map((item, index) => (
                            <CardBox key={index} obj={item} type={"boxTypes"}/>
                        ))
                    }
                    </div>
                </SwiperSlide>
                {
                    simpleBox &&
                    <SwiperSlide className={`${style.customSlide} ${style.customSlide2}`}>
                    <div className={style.three_d_box}>
                        <div className={!front ? style.front : style.front_open} onClick={openFront}>
                            {/* <img src="http://localhost:5000/typesBox/box-cart-box.png" alt="" ref={textRef}/>
                            <Moveable
                                target={textRef}
                                scalable={true}
                                keepRatio={true}
                                draggable={true}
                                snappable={true}
                                bounds={{left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
                                onScaleStart={e => {
                                    e.setFixedDirection([0, 0]);
                                }}
                                onDrag={e => {
                                    e.target.style.transform = e.transform;
                                }}
                                onBeforeScale={e => {
                                    if (keycon.global.shiftKey) {
                                        e.setFixedDirection([-1, -1]);
                                    } else {
                                        e.setFixedDirection([0, 0]);
                                    }
                                }}
                                onScale={e => {
                                    e.target.style.transform = e.drag.transform;
                                }}
                            /> */}
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
                    <div className={style.customSlide__list__types}>
                        {
                            product && product.map((item, index) => (
                                <CardBox key={index} obj={item} type={"product"}/>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>
                    <div className={style.customSlide__list__types}>
                        {
                            postCard && postCard.map((item, index) => (
                                <CardBox key={index} obj={item} type={"postCard"}/>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>
                    <div className={style.check__block}>
                        <div className={style.block__total_price}>
                            <h3 className={style.title}>Ваш заказ</h3>
                            <div className={style.cart__info}>
                                <div className={style.info__item}>
                                <p>Кол-во:</p>
                                <p>
                                    {/* {checkArray.length !== 0 ? checkArray.length : cart.length}{" "} */}
                                    шт.
                                </p>
                                </div>
                                <div className={style.info__item}>
                                <p>Сумма:</p>
                                {/* <p>{cartTotalPrice} BYN</p> */}
                                </div>
                                <div className={style.info__item}>
                                <p>Скидка:</p>
                                {/* <p>{sale.percentage} %</p> */}
                                </div>
                            </div>
                            <input
                            //     className={`${style.promo} ${
                            //     // sale.active == true
                            //     //     ? style.promo__active__true
                            //     //     : sale.active == false
                            //     //     ? style.promo__active__false
                            //     //     : ''
                            //     }`
                            // }
                                type="text"
                                placeholder="Промокод..."
                                // onInput={(event) =>  {
                                //     // if(event.target.value.length === 0) {
                                //     //     setSale({
                                //     //         active: false,
                                //     //         percentage: 0
                                //     //     });
                                //     // } else if(event.target.value.length > 0) {
                                //     //     delayedSearch(event.target.value);
                                //     // }
                                // }}
                            />
                            <div className={style.pay}>
                                <div className={style.pay_item}>
                                <p>Итог к оплате: </p>
                                <p className={style.totalPrice}>
                                    {/* {totalPrice} BYN */}
                                </p>
                                </div>
                                <button className={style.btn_checkout}>Оформить</button>
                            </div>
                        </div>
                        <div className={style.customSlide__list__items}>
                            {
                                typesBox && typesBox.map((item, index) => (
                                    <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count}/>
                                ))
                            }
                            {
                                productGift && productGift.map((item, index) => (
                                    <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count}/>
                                ))
                            }
                            {
                                postcards && postcards.map((item, index) => (
                                    <ItemConstructor key={index} _id={item._id} photo={item.photo} title={item.title} price={item.price} count={item.count}/>
                                ))
                            }
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;