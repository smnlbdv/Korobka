/* eslint-disable react/prop-types */
import style from './review.module.scss'

const Review = ({img, name, lastName, text, data}) => {
    return ( 
        <div className={style.slide_item}>
            <div className={style.slide_header}>
                <div className={style.logo}>
                    <img className={style.image} src={img} alt="" />
                    <p className={style.first_last}>{name} {lastName}</p>
                </div>
                <div className={style.static} >
                    <img src='/assets/star.svg' alt="" />
                    <img src='/assets/star.svg' alt="" />
                    <img src='/assets/star.svg' alt="" />
                    <img src='/assets/star.svg' alt="" />
                    <img src='/assets/star.svg' alt="" />
                </div>
            </div>
            <div className={style.text}>
                <p>{text}</p>
            </div>
            <span className={style.date}>{data}</span>
        </div>
     );
}
 
export default Review;