import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AutoComplete } from 'antd';

import * as Yup from "yup";
import style from './orderPage.module.scss'
import './ant.css'

import InputProfile from "../../components/inputProfile/inputProfile";
import ButtonCreate from "../../components/buttonCreate/buttonCreate";
// eslint-disable-next-line react/prop-types

const OrderPage = () => {

    const options = [
        {
          value: 'Burns Bay Road',
        },
        {
          value: 'Downing Street',
        },
        {
          value: 'Wall Street',
        },
      ];

    const formikPersonal = useFormik({
        initialValues: {
          address: "",
          surname: "",
          phone: "",
          email: "",
        },
        validationSchema: Yup.object({
          address: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов").min(3,"Слишком короткое имя"),
          surname: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов"),
          email: Yup.string()
            .email("Некорректный e-mail")
            .required("Обязательное поле"),
          phone: Yup.string()
            .matches(
              /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
              "Неверный формат телефона"
            )
        }),
        onSubmit: (values) => {
          console.log(values);
        },
      });

    return ( 
        <section className={`${style.section_cart} wrapper`}>
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
            <div className={style.block__orders}>
                <div className={style.block__form}>
                    <form
                        onSubmit={formikPersonal.handleSubmit}
                        className={style.personal__data}
                        >
                        <div className={style.personal__input__block}>
                            <div className={style.input__block}>
                                <p className={style.input__title}>
                                    Адрес *
                                </p>
                                <AutoComplete
                                    options={options}
                                    placeholder="г. Гродно"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    
                                />
                                {
                                    formikPersonal.errors.name &&
                                    <p className={style.error__message}>
                                    {formikPersonal.errors.name}
                                    </p>
                                }
                            </div>
                            <div className={style.input__block}>
                                <p className={style.input__title}>Фамилия *</p>
                                <InputProfile
                                    id="surname"
                                    name="surname"
                                    typeInput={"text"}
                                    value={formikPersonal.values.surname}
                                    onChange={formikPersonal.handleChange}
                                    placeholder={"Иванов"}
                                    errorChange = {formikPersonal.errors.surname && "true"}
                                />
                                {
                                    formikPersonal.errors.surname &&
                                    <p className={style.error__message}>
                                    {formikPersonal.errors.surname}
                                    </p>
                                }
                            </div>
                            <div className={style.input__block}>
                                <p className={style.input__title}>Фамилия *</p>
                                <InputProfile
                                    id="surname"
                                    name="surname"
                                    typeInput={"text"}
                                    value={formikPersonal.values.surname}
                                    onChange={formikPersonal.handleChange}
                                    placeholder={"Иванов"}
                                    errorChange = {formikPersonal.errors.surname && "true"}
                                />
                                {
                                    formikPersonal.errors.surname &&
                                    <p className={style.error__message}>
                                    {formikPersonal.errors.surname}
                                    </p>
                                }
                            </div>
                            <div className={style.input__block}>
                                <p className={style.input__title}>Фамилия *</p>
                                <InputProfile
                                    id="surname"
                                    name="surname"
                                    typeInput={"text"}
                                    value={formikPersonal.values.surname}
                                    onChange={formikPersonal.handleChange}
                                    placeholder={"Иванов"}
                                    errorChange = {formikPersonal.errors.surname && "true"}
                                />
                                {
                                    formikPersonal.errors.surname &&
                                    <p className={style.error__message}>
                                    {formikPersonal.errors.surname}
                                    </p>
                                }
                            </div>
                        </div>
                        <p className={style.required__title}>* - поля обязательные для заполнения</p>
                        <div className={style.button__save}>
                            <ButtonCreate text={"Сохранить"} type={"submit"} disabled={Object.keys(formikPersonal.errors).length > 0}/>
                        </div>
                        </form>
                    </div>
                <div>

                </div>
            </div>
        </section>
     );
}
 
export default OrderPage;