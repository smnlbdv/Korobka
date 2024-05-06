import React, { useEffect, useRef, useState } from 'react';

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import style from './constructorBox.module.scss'
import "../../index.scss"
import "./constructor.scss"

import { Pagination } from 'swiper/modules';

const ConstructorBox = () => {

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
                <SwiperSlide className={style.customSlide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 2</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 3</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 4</SwiperSlide>
                <SwiperSlide className={style.customSlide}>Slide 5</SwiperSlide>
            </Swiper>

        </section>
     );
}
 
export default ConstructorBox;