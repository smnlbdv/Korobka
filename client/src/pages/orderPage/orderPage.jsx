import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useFormik } from "formik";
import { Radio } from 'antd';
import { deleteCartItemAsync } from "../../store/cartSlice.js";

import * as Yup from "yup";
import style from './orderPage.module.scss'

import InputProfile from "../../components/inputProfile/inputProfile";
import ButtonCreate from "../../components/buttonCreate/buttonCreate";
import OrderItem from "../../components/orderItem/orderItem.jsx";
import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types

const OrderPage = () => {

    const [successStatus, setSuccessStatus] = useState(false)
    const [url, setUrl] = useState('#')
    const { profile, placeOrder, contextHolder, downloadCheck, setCart } = useContext(AuthContext);
    const [checkArray, setCheckArray] = useState([])
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('checkArray'));
        setCheckArray(storedData)
    }, [])

    const formikOrder = useFormik({
        initialValues: {
          address: "",
          name: "",
          lastname: "",
          phone: "",
          email: "",
          wayPay: ""
        },
        validationSchema: Yup.object({
          address: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов"),
          name: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов"),
          lastname: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов"),
          email: Yup.string().email("Некорректный e-mail").required("Обязательное поле"),
          wayPay: Yup.string().required("Обязательное поле"),
          phone: Yup.string()
            .matches(
              /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
              "Неверный формат телефона"
            )
            .required("Обязательное поле"),
        }),
        onSubmit: async (values) => {
            const resultOrder = await placeOrder(values)
            setSuccessStatus(resultOrder.result)
            setUrl(resultOrder.url);

            if(checkArray.length > 0) {
                checkArray.forEach((element) => {
                    dispatch(deleteCartItemAsync(element._id));
                    setCart(cart.filter((item) => item._id !== element._id));
                });
                setCheckArray([]);
            } else {
                cart.map((item) => {
                    dispatch(deleteCartItemAsync(item._id));
                });
            }
        },
      });
    
    useEffect(() => {
        if (profile.length != 0) {
            formikOrder.setValues({
              name: profile.name,
              lastname: profile.surname,
              email: profile.email?.email || " ",
              phone: profile.phone,
            })
        }
    }, [profile])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <section className={`${style.section_cart} wrapper`}>
            {contextHolder}
            <ul className="bread-crumbs">
                <Link to="/">
                    <li>Главная</li>
                </Link>
                <Link to="/">
                    <li>Корзина</li>
                </Link>
                <li>Оформление заказа</li>
            </ul>
            <h2 className={`${style.section_title} section__title`}>Оформление заказа</h2>
            {
                !successStatus ?
                <div className={style.block__orders}>
                    <div className={style.block__form}>
                        <form
                            onSubmit={formikOrder.handleSubmit}
                            className={style.personal__data}
                            >
                            <div className={style.personal__input__block}>
                                <div className={style.block__fullname}>
                                    <div className={style.input__block}>
                                        <p className={style.input__title}>Имя *</p>
                                        <InputProfile
                                            id="name"
                                            name="name"
                                            typeInput={"text"}
                                            value={formikOrder.values.name}
                                            onChange={formikOrder.handleChange}
                                            placeholder={"Иван"}
                                            errorChange = {formikOrder.errors.name && "true"}
                                        />
                                    </div>
                                    <div className={style.input__block}>
                                        <p className={style.input__title}>Фамилия *</p>
                                        <InputProfile
                                            id="lastname"
                                            name="lastname"
                                            typeInput={"text"}
                                            value={formikOrder.values.lastname}
                                            onChange={formikOrder.handleChange}
                                            placeholder={"Иванов"}
                                            errorChange = {formikOrder.errors.lastname && "true"}
                                        />
                                    </div>
                                </div>
                                <div className={style.input__block}>
                                        <p className={style.input__title}>Email*</p>
                                        <InputProfile
                                            id="email"
                                            name="email"
                                            typeInput={"text"}
                                            value={formikOrder.values.email}
                                            onChange={formikOrder.handleChange}
                                            placeholder={"korobka@gmail.com"}
                                            errorChange = {formikOrder.errors.email && "true"}
                                        />
                                    </div>
                                <div className={style.input__block}>
                                    <p className={style.input__title}>
                                        Адрес *
                                    </p>
                                    <InputProfile
                                        id="address"
                                        name="address"
                                        typeInput={"text"}
                                        value={formikOrder.values.address}
                                        onChange={formikOrder.handleChange}
                                        placeholder={"Беларусь, г. Гродно, ул. Врублевского 77/1"}
                                        errorChange = {formikOrder.errors.address && "true"}
                                    />
                                </div>
                                <div className={style.input__block}>
                                    <p className={style.input__title}>
                                        Номер телефона *
                                    </p>
                                    <InputProfile
                                        id="phone"
                                        name="phone"
                                        typeInput={"tel"}
                                        placeholder={"+375 (99) 999-99-99"}
                                        value={formikOrder.values.phone}
                                        onChange={formikOrder.handleChange}
                                        errorChange = {formikOrder.errors.phone && "true"}
                                        tel = {"true"}
                                    />
                                </div>
                                <div className={style.input__block}>
                                    <p className={style.input__title}>Выберите способ оплаты *</p>
                                    <div className={style.block__pay}>
                                        <Radio.Group id="wayPay" name="wayPay" onChange={formikOrder.handleChange} defaultValue={undefined}>
                                            <Radio value={"visa"}>
                                                <div className={style.block__pay__image}>
                                                    <img className={style.pay__image} src="../assets/visa.svg" alt="Visa" />
                                                </div>
                                            </Radio>
                                            <Radio value={"mastercard"}>
                                                <div className={style.block__pay__image}>
                                                    <img className={style.pay__image} src="../assets/mastercard.svg" alt="Mastercard" />
                                                </div>
                                            </Radio>
                                            <Radio value={"verve"}>
                                                <div className={style.block__pay__image}>
                                                    <img className={style.pay__image} src="../assets/verve.svg" alt="Verve" />
                                                </div>
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <p className={style.required__title}>* - поля обязательные для заполнения</p>
                            <div className={style.button__save}>
                                <ButtonCreate text={"Заказать"} type={"submit"} disabled={Object.keys(formikOrder.errors).length > 0}/>
                            </div>
                        </form>
                    </div>
                    <div className={style.block__order__items}>
                        {checkArray.length !== 0 ? (
                            checkArray.map((obj, index) => 
                                <OrderItem
                                    key={index}
                                    {...obj}
                                />
                            )
                        ) : (
                            cart.map((obj, index) => 
                                <OrderItem
                                    key={index}
                                    {...obj}
                                />
                            )
                        )}
                    </div>
                </div>
                :
                <div className={style.block__successStatus}>
                    <div className={style.inner__block__success}>
                        <img className={style.block__successStatus__image} src="../../assets/party_popper.png" alt="Popper" />
                        <p className={style.block__successStatus__text}>Заказ успешно оформлен</p>
                        <div className={style.block__buttons}>
                            <ButtonNull title={"В каталог"} path={'/ready-gifts/all'}/>
                            <a className={style.button__check} href={url} target="_blank" rel="noopener noreferrer">Чек</a>
                        </div>
                    </div>
                </div>
            }
        </section>
     );
}
 
export default OrderPage;