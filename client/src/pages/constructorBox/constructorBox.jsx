import React, { useContext, useEffect, useRef, useState } from 'react';
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
    const { getTypesBox } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await getTypesBox();
                console.log(types);
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
                <SwiperSlide className={style.customSlide}>Slide 2</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 3</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 4</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 5</SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;