/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useFormik } from "formik";
import { Tabs } from "antd";
import * as Yup from "yup";

import "../../libs/ant.css";
// import CartItem from '../../components/cartItem/cartItem.jsx'
// import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";
import style from "./profile.module.scss";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";

const Profile = () => {
  const { uploadAvatar, profile, setProfile, getProfile, logout, updateProfileUser, contextHolder } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const inputNewPass = useRef(null);
  const inputPrePass = useRef(null);
  const inputDoublePass = useRef(null);
  const [avatarUser, setAvatarUser] = useState("")
  const [typeInputPass, setTypeInputPass] = useState("password")

  const hiddenPass = (e) => {
    e.preventDefault()
    if(typeInputPass == "password") {
      setTypeInputPass("text")
    } else {
      setTypeInputPass("password")
    }
    
  }

  const formikPass = useFormik({
    initialValues: {
      prepassword: '',
      password: '',
      confirmPassword: '',  
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(5, 'Длинна меньше 5 символов'),
      confirmPassword: Yup.string()
        .min(5, 'Длинна меньше 5 символов')
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    }),
    onSubmit: values => {
      console.log(values)
    },
  });

  const formikPersonal = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательное поле").max(50,"Превышено кол-во допустимых символов").min(3,"Слишком короткое имя"),
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
      const formData = {
        ...values,
        status: profile.status,
        avatarUser: profile.avatarUser
      }

      const isRighData = JSON.stringify(profile) === JSON.stringify(formData);

      if(!isRighData) {
        const changedItems = Object.keys(profile).reduce((result, key) => {
          if (profile[key] !== formData[key]) {
            result[key] = formData[key];
          }
          return result;
        }, {});
        updateProfileUser(changedItems);
      }
    },
  });

  useEffect(() => {
    if (profile.length == 0) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (profile.length != 0) {
      formikPersonal.setValues({
        name: profile.name,
        surname: profile.surname,
        email: profile.email,
        phone: profile.phone,
      })
      setAvatarUser(profile.avatarUser)
    }
  }, [profile]);

  const itemsTabs = [
    {
      key: '1',
      label: 'Личные данные',
      children: 
        <form
          onSubmit={formikPersonal.handleSubmit}
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
                value={formikPersonal.values.name}
                placeholder={"Иван"}
                onChange={formikPersonal.handleChange}
                errorChange = {formikPersonal.errors.name && "true"}
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
          </div>
          <div className={style.personal__input__block}>
            <div className={style.input__block}>
              <p className={style.input__title}>E-mail *</p>
              <InputProfile
                id="email"
                name="email"
                typeInput={"text"}
                placeholder={"ivanov@gmail.com"}
                value={formikPersonal.values.email}
                onChange={formikPersonal.handleChange}
                errorChange = {formikPersonal.errors.email && "true"}
              />
              {
                formikPersonal.errors.email &&
                <p className={style.error__message}>
                  {formikPersonal.errors.email}
                </p>
              }
            </div>
            <div className={style.input__block}>
              <p className={style.input__title}>Номер телефона</p>
              <InputProfile
                id="phone"
                name="phone"
                typeInput={"text"}
                placeholder={"+375 (99) 999-99-99"}
                value={formikPersonal.values.phone}
                onChange={formikPersonal.handleChange}
                errorChange = {formikPersonal.errors.phone && "true"}
                tel = {"true"}
                
              />
              {
                formikPersonal.errors.phone &&
                <p className={style.error__message}>
                  {formikPersonal.errors.phone}
                </p>
              }
            </div>
          </div>
          <p className={style.required__title}>* - поля обязательные для заполнения</p>
          <div className={style.button__save}>
            <ButtonCreate text={"Сохранить"} type={"submit"} />
          </div>
        </form>
              ,
    },
    {
      key: '2',
      label: 'Сброс пароля',
      children: 
        <form className={style.personal__data} onSubmit={formikPass.handleSubmit}>
        <div className={style.personal__input__block}>
          <div className={style.input__block}>
            <p className={style.input__title}>Старый пароль</p>
            <InputProfile
              id="prepassword"
              name="prepassword"
              typeInput={typeInputPass}
              hiddenImage={true}
              value={formikPass.values.prepassword}
              url={"/assets/lock-sign-up.svg"}
              placeholder={""}
              onChange={formikPass.handleChange}
              ref={inputPrePass}
            />
          </div>
          <button className={style.button__hidden__pass} onClick={hiddenPass}>
            Показать пароли
          </button>
        </div>
        <div className={style.personal__input__block}>
          <div className={style.input__block}>
            <p className={style.input__title}>Новый пароль</p>
            <InputProfile
              id="password"
              name="password"
              value={formikPass.values.password}
              onChange={formikPass.handleChange}
              typeInput={typeInputPass}
              hiddenImage={true}
              url={"/assets/lock-sign-up.svg"}
              placeholder={""}
              errorChange = {formikPass.errors.password && "true"}
              ref={inputNewPass}
            />
            {
                formikPass.errors.password &&
                <p className={style.error__message}>
                  {formikPass.errors.password}
                </p>
            }
          </div>
          <div className={style.input__block}>
            <p className={style.input__title}>Повторите пароль</p>
            <InputProfile
              id="confirmPassword"
              name="confirmPassword"
              value={formikPass.values.confirmPassword}
              onChange={formikPass.handleChange}
              typeInput={typeInputPass}
              hiddenImage={true}
              url={"/assets/lock-sign-up.svg"}
              placeholder={""}
              errorChange = {formikPass.errors.confirmPassword && "true"}
              ref={inputDoublePass}
            />
            {
                formikPass.errors.confirmPassword &&
                <p className={style.error__message}>
                  {formikPass.errors.confirmPassword}
                </p>
            }
          </div>
        </div>
        <div className={style.button__save}>
          <ButtonCreate text={"Сбросить"} type={"submit"} />
        </div>
      </form>
      ,
    }
  ];

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      await uploadAvatar(formData).then(
        (response) => (setAvatarUser(response))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    setProfile("")
    logout();
    navigate("/");
  };

  return (
    <section className={`${style.section_profile} wrapper`}>
      {contextHolder}
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
              <img src={avatarUser} alt="" />
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

          <Tabs defaultActiveKey="1" items={itemsTabs}>
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

export default Profile;
