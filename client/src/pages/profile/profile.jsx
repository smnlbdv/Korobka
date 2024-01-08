/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useFormik } from "formik";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import * as Yup from "yup";

import "../../libs/ant.css";
// import CartItem from '../../components/cartItem/cartItem.jsx'
// import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";
import style from "./profile.module.scss";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";

const Profil = () => {
  //   const [checkAll, setCheckAll] = useState(false);
  const { uploadAvatar, profile, getProfile, logout } = useContext(AuthContext);
  const avatarUser = useRef();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов"),
      email: Yup.string()
        .email("Некорректный адрес электронной почты")
        .required("Обязательное поле"),
      phone: Yup.string()
        .matches(
          /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
          "Неверный формат телефона. Введите в формате: +375 (99) 999-99-99"
        )
    }),
    onSubmit: (values) => {
      // Выполните необходимые действия при отправке формы
      console.log(values);
    },
  });

  useEffect(() => {
    if (profile.length == 0) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (profile.length != 0) {
      formik.setValues({
        name: profile.name,
        surname: profile.surname,
        email: profile.email,
        phone: profile.phone,
      })
    }
  }, [profile]);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      await uploadAvatar(formData).then(
        (response) => (avatarUser.current.src = response)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <section className={`${style.section_profile} wrapper`}>
      <ul className="bread-crumbs">
        <Link to="/">
          <li>Главная</li>
        </Link>
        <li>Профиль</li>
      </ul>
      <h2 className={`${style.section_title} section__title`}>Профиль</h2>
      <div className={style.main__block__profile}>
        <div className={style.block__user}>
          <div className={style.header__block}>
            <div className={style.update__image__block}>
              <img ref={avatarUser} src={profile.avatarUser} alt="" />
            </div>
            <div>
              <p className={style.fullname__name}>{profile.name + " " + profile.surname}</p>
              <p className={style.user__status}>{profile.status}</p>
            </div>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
              name="avatar"
            />
            <button
              className={`${style.button__header__block} ${style.button__add__photo}`}
              onClick={(e) => {
                inputFileRef.current.click();
                e.preventDefault();
              }}
            >
              Добавить фото
            </button>
            <button
              className={`${style.button__header__block} ${style.button__delete__photo}`}
              onClick={logoutUser}
            >
              Выйти
            </button>
          </div>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Личная информация" key="1">
              <form
                onSubmit={formik.handleSubmit}
                className={style.personal__data}
              >
                <div className={style.personal__input__block}>
                  <div className={style.input__block}>
                    <p className={style.input__title}>
                      Имя *
                    </p>
                    <InputProfile
                      id="name"
                      name="name"
                      typeInput={"text"}
                      value={formik.values.name}
                      placeholder={"Иван"}
                      onChange={formik.handleChange}
                      errorChange = {formik.errors.name && "true"}
                    />
                  </div>
                  <div className={style.input__block}>
                    <p className={style.input__title}>Фамилия</p>
                    <InputProfile
                      typeInput={"text"}
                      value={formik.values.surname}
                      onChange={formik.handleChange}
                      placeholder={"Иванов"}
                    />
                  </div>
                </div>
                <div className={style.personal__input__block}>
                  <div className={style.input__block}>
                    <p className={style.input__title}>E-mail *</p>
                    <InputProfile
                      id="email"
                      name="email"
                      typeInput={"text"}
                      placeholder={"ivanov@gmail.com"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      errorChange = {formik.errors.email && "true"}
                    />
                  </div>
                  <div className={style.input__block}>
                    <p className={style.input__title}>Номер телефона</p>
                    <InputProfile
                      id="phone"
                      name="phone"
                      typeInput={"text"}
                      placeholder={"+375 (99) 999-99-99"}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      errorChange = {formik.errors.phone && "true"}
                    />
                  </div>
                </div>
                <div className={style.button__save}>
                  <ButtonCreate text={"Сохранить"} type={"submit"} />
                </div>
              </form>
            </TabPane>
            <TabPane tab="Сброс пароля" key="2">
              <form className={style.personal__data}>
                <div className={style.personal__input__block}>
                  <div className={style.input__block}>
                    <p className={style.input__title}>Старый пароль</p>
                    <InputProfile
                      typeInput={"text"}
                      hiddenImage={true}
                      url={"/assets/lock-sign-up.svg"}
                      placeholder={""}
                    />
                  </div>
                  <button className={style.button__hidden__pass}>
                    Показать пароли
                  </button>
                </div>
                <div className={style.personal__input__block}>
                  <div className={style.input__block}>
                    <p className={style.input__title}>Новый пароль</p>
                    <InputProfile
                      typeInput={"text"}
                      hiddenImage={true}
                      url={"/assets/lock-sign-up.svg"}
                      placeholder={""}
                    />
                  </div>
                  <div className={style.input__block}>
                    <p className={style.input__title}>Повторите пароль</p>
                    <InputProfile
                      typeInput={"text"}
                      hiddenImage={true}
                      url={"/assets/lock-sign-up.svg"}
                      placeholder={""}
                    />
                  </div>
                </div>
                <div className={style.button__save}>
                  <ButtonCreate text={"Сбросить"} type={"submit"} />
                </div>
              </form>
            </TabPane>
          </Tabs>
        </div>

        <div className={style.block__order}>
          <h3 className={style.order__title}>Мои заказы</h3>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Profil;
