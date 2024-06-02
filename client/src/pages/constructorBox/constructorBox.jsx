import { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AuthContext } from "../../context/authContext.js";

import 'swiper/css';
import 'swiper/css/pagination';
import style from './constructorBox.module.scss'
import "../../index.scss"
import "./constructor.scss"

import { Pagination } from 'swiper/modules';
import CardBox from '../../components/cardBox/cardBox.jsx';


const ConstructorBox = () => {

    const [boxTypes, setBoxTypes] = useState()
    const [product, setProduct] = useState()
    const { getTypesBox, getProduct } = useContext(AuthContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await getTypesBox();
                const productRes = await getProduct()

                setProduct(productRes)
                setBoxTypes(types);
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
                            <CardBox key={index} obj={item}/>
                        ))
                    }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={`${style.customSlide} ${style.customSlide2}`}>
                    <div className={style.three_d_box}>
                        <div className={style.front}></div>
                        <div className={style.back}></div>
                        <div className={style.left}></div>
                        <div className={style.right}></div>
                        <div className={style.top}></div>
                        <div className={style.bottom}></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>
                    <div className={style.customSlide__list__types}>
                        {
                            product && product.map((item, index) => (
                                <CardBox key={index} obj={item}/>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 4</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 5</SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;