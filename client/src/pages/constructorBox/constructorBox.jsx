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
                className={`${style.customSwiper} mySwiper-constructor`}
            >
                <SwiperSlide className={style.customSlide}>
                    <div className={style.customSlide__list__types}>
                    {
                        boxTypes && boxTypes.map((item, index) => (
                            <CardBox key={index} obj={item} type={"boxTypes"}/>
                        ))
                    }
                    </div>
                </SwiperSlide>
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
                </SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;