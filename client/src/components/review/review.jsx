import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import style from './review.module.scss'
import Rating from '@mui/material/Rating'

import '../../libs/ant.css'
import LikeButton from '../likeButton/likeButton.jsx';

// eslint-disable-next-line react/prop-types
const Review = ({img, name, lastName, text, data, stars, likes, hidden = false }) => {

    return ( 
        <div className={style.slide_item}>
            <div className={style.review__header__block}>
                    <div className={style.slide_header}>
                        <div className={style.logo}>
                            <img className={style.image} src={img} alt="" />
                            <p className={style.first_last}>{name} {lastName}</p>
                        </div>
                        <div className={style.static} >
                            <Rating name="read-only" value={stars} readOnly />
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
     );
}
 
export default Review;