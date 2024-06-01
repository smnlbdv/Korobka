import { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import style from './review.module.scss'
import Rating from '@mui/material/Rating'
import { useAuth } from "../../hooks/auth.hook.js";

import '../../libs/ant.css'
import LikeButton from '../likeButton/likeButton.jsx';

// eslint-disable-next-line react/prop-types
const Review = ({id, img, name, lastName, text, data, stars, likes = [], hidden = false, slider = [] }) => {

    const [countLikes, setCountLikes] = useState(0)
    const openBlock = useRef()
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handleOpenGallery = () => {
        if(isGalleryOpen) {
            setIsGalleryOpen(false)
            openBlock.current.style.padding = "0px";
            openBlock.current.style.maxHeight = 0 + 'px';
            openBlock.current.style.height = 0 + 'px';
        } else {
            setIsGalleryOpen(true)
            openBlock.current.style.padding = "30px 30px 20px 30px";
            openBlock.current.style.maxHeight = openBlock.current.scrollHeight + 'px';
            openBlock.current.style.height = openBlock.current.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        setCountLikes(likes.length)
    }, [])

    return ( 
        <div className={slider.length == 0 ? style.slide_item : style.slide_item_photos}>
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
                            <LikeButton id={id} countLikes={countLikes} setCountLikes={setCountLikes} likes={likes}/>
                        }
                    </div>
            </div>
            {
                slider.length !== 0 &&
                <div className={style.footer__review__photos}>
                    <div className={style.list__photos_review}  ref={openBlock}>
                        {slider.map((photo, index) => (
                            <div className={style.photo__block} key={index}>
                                <img src={photo} alt={"Photo review"} />
                            </div>
                        ))}
                    </div>
                    <button className={style.button__open_galety} onClick={handleOpenGallery}>
                        {isGalleryOpen ? "Скрыть фото" : `Показать ${slider.length} фото`}
                    </button>
                </div>
            }
        </div>
     );
}
 
export default Review;