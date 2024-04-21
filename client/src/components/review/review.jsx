import { useState } from 'react';
import { Rate } from 'antd';
/* eslint-disable react/prop-types */
import style from './review.module.scss'

import '../../libs/ant.css'
import LikeButton from '../likeButton/likeButton.jsx';

const Review = ({img, name, lastName, text, data, stars, likes, hidden = false }) => {

    return ( 
        <div className={style.slide_item}>
            <div className={style.review__header__block}>
                <div className={style.review__left_block}>
                    <div className={style.slide_header}>
                        <div className={style.logo}>
                            <img className={style.image} src={img} alt="" />
                            <p className={style.first_last}>{name} {lastName}</p>
                        </div>
                        <div className={style.static} >
                            <Rate disabled defaultValue={stars}/>
                        </div>
                    </div>
                    <div className={style.text}>
                        <p>{text}</p>
                    </div>
                    <div className={style.footer__review}>
                        <span className={style.date}>{data}</span>
                        {
                            hidden && 
                            <LikeButton likes={likes}/>
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Review;