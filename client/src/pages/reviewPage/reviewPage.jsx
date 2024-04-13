import { useState } from 'react';
import { Link  } from 'react-router-dom';

import * as Yup from "yup";
import { useFormik } from "formik";
import { Rate } from 'antd';

import style from './reviewPage.module.scss'

const ReviewPage = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

    const formikReview = useFormik({
        initialValues: {
          text: ""
        },
        validationSchema: Yup.object().shape({
          text: Yup.string().max(150, "Длина меньше 150 символов").min(50, "Длина не должна быть меньше 50"),
          
        }),
        onSubmit: () => {
          
        },
    });

    return ( 
        <section className={`${style.section_review} wrapper`}>
            <ul className="bread-crumbs">
                <Link to="/">
                    <li>Главная</li>
                </Link>
                <li>Отзыв</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Отзыв</h2>
            <div className={style.main__block__review}>
                <form action="">
                    <div className={style.inner__block__form}>
                        <textarea
                            className={style.input__text}
                            id="text"
                            name="text"
                            value={formikReview.values.text}
                            placeholder="Напишите немного о товаре"
                            onChange={formikReview.handleChange}
                            maxLength={150}
                        ></textarea>
                       <div className={style.block__lower}>
                            {formikReview.errors.text && (
                                <p className={style.error__message}>
                                    {formikReview.errors.text}
                                </p>
                            )}
                            <p className={style.count__letters}>{formikReview.values.text.length} / 150</p>
                       </div>
                    </div>
                    <div>
                        {[...Array(totalStars)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        onChange={() => setRating(currentRating)}
                                    />
                                    <span
                                        className="star"
                                        style={{
                                            color:
                                                currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                            }}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                    >
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </form>
            </div>
        </section>
     );
}
 
export default ReviewPage;