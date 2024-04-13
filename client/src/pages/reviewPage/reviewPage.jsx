import { useEffect, useRef, useState } from 'react';
import { Link  } from 'react-router-dom';
import { useParams } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import api from '../../api/api.js';

import style from './reviewPage.module.scss'

const ReviewPage = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [countImage, setCountImage] = useState(0);
    const [totalStars, setTotalStars] = useState(5);
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                await api.get(`/api/products/${id}`)
                          .then(response => {
                            setProduct(...response.data);
                          })
                          .catch(error => alert(error.message))
              } catch (error) {
                console.log("Ошибка", error);
              }
        }
        fetchData()
    }, [])

    function previewImage(event) {
        const blockList = document.querySelector(`.${style.block__list__image}`)
        console.log(blockList);
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function(event) {
            const newElement = document.createElement('div');
            const newImage = document.createElement('img');
            newImage.src = event.target.result;
            newImage.alt = '';
            newImage.style.width = '100%';
            newImage.style.height = '100%';
            newImage.style.objectFit = 'cover';
            newImage.style.borderRadius = '20px';
            newElement.appendChild(newImage);

            blockList.insertBefore(newElement, blockList.firstChild);
        };
    
        if (file) {
            if(countImage !== 5) {
                reader.readAsDataURL(file);
                setCountImage(countImage + 1)
            }
        }
    }

    const formikReview = useFormik({
        initialValues: {
          text: ""
        },
        validationSchema: Yup.object().shape({
          text: Yup.string().max(150, "Длина меньше 150 символов").min(50, "Длина не должна быть меньше 50"),
          
        }),
        onSubmit: (value) => {
            console.log(value);
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
            <h2 className={`${style.section_title} section__title`}>Отзыв к товару: {product.title} </h2>
            <div className={style.review__inner__block}>
                <div className={style.main__block__review}>
                    <div className={style.product__block__image}>
                        <div className={style.main__image__product}>
                            <img src={product.img} alt="" />
                        </div>
                        <div className={style.block__slider__images}>
                            {
                                product.slider &&
                                product.slider.map((item, index) => (
                                    <div className={style.item__slider__product} key={index}>
                                        <img src={item} alt="Slider image" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <form action="" onSubmit={formikReview.handleSubmit}>
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
                        <div className={style.main__block__stars}>
                            <p>Оцените товар: </p>
                            <div className={style.block__stars}>
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
                                            className={style.star}
                                            style={{
                                                    backgroundImage: `url(${currentRating <= (hover || rating) ? '../../assets/star-review-active.svg' : '../../assets/star-review.svg'})`
                                                }}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                        >
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        </div>
                        <ButtonCreate
                            text={"Сохранить"}
                            type={"submit"}
                            disabled={Object.keys(formikReview.errors).length > 0}
                        />
                    </form>
                </div>
                <div className={style.block__select__image}>
                    <div className={style.block__review__right}>
                        <div className={style.header__list__image}>
                            <p className={style.block__select__title}>Прикрепите фото </p>
                            <p className={countImage == 5 && style.icon__image__full}>Выбрано: {countImage}/5</p>
                        </div>
                        <div className={style.block__list__image}>
                            <div className={style.item__select}>
                                <label htmlFor="image"></label>
                                <input type="file" name="" id="image" onChange={(event) => previewImage(event)}  disabled={countImage == 5 && "true"} />
                                <div className={`${style.item__select__image} ${style.icon__image}`}>
                                    <img src="/assets/gallery-add.svg" alt="Icon clip"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default ReviewPage;