/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useFormik } from "formik";
import { Tabs, Modal } from "antd";
import * as Yup from "yup";

import "./ant.css";

import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";
import style from "./profile.module.scss";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";
import ProfileOrderItem from "../../components/profileOrderItem/profileOrderItem.jsx";
import ModalProfileItem from "../../components/modalProdileItem/modalProfileItem.jsx";

const Profile = () => {
  const {
    uploadAvatar,
    profile,
    setProfile,
    getProfile,
    logout,
    updateProfileUser,
    contextHolder,
    order,
    updatePassUser,
    scrollToTop,
  } = useContext(AuthContext);
  const inputFileRef = useRef(null);
  const inputNewPass = useRef(null);
  const inputPrePass = useRef(null);
  const inputDoublePass = useRef(null);
  const [avatarUser, setAvatarUser] = useState("");
  const [initialData, setInitialData] = useState({});
  const [typeInputPass, setTypeInputPass] = useState("password");
  const [titleHiddenButton, setTitleHiddenButton] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const showModal = (_id) => {
    setIsModalOpen(true);
    
    order.forEach((orderItem) => {
      if(String(orderItem._id) === String(_id)) {
        setSelectedItems([...orderItem.items]);
      }
    })
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hiddenPass = (e) => {
    e.preventDefault();
    if (typeInputPass == "password") {
      setTypeInputPass("text");
      setTitleHiddenButton(false);
    } else {
      setTypeInputPass("password");
      setTitleHiddenButton(true);
    }
  };

  const formikPass = useFormik({
    initialValues: {
      prepassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().min(5, "Длинна меньше 5 символов"),
      confirmPassword: Yup.string()
        .min(5, "Длинна меньше 5 символов")
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      if (
        values.prepassword != 0 &&
        values.password != 0 &&
        values.confirmPassword != 0
      ) {
        await updatePassUser(values).then((response) => {
          if (!response) {
            setFieldError("prepassword", "Неверный пароль");
          }
        });
      } else {
        if (!values.prepassword) {
          setFieldError("prepassword", "Введите значение");
        }
        if (!values.password) {
          setFieldError("password", "Введите значение");
        }
        if (!values.confirmPassword) {
          setFieldError("confirmPassword", "Введите значение");
        }
      }
    },
  });

  function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const formikPersonal = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Обязательное поле")
        .max(50, "Превышено кол-во допустимых символов")
        .min(3, "Слишком короткое имя"),
      surname: Yup.string()
        .required("Обязательное поле")
        .max(50, "Превышено кол-во допустимых символов"),
      email: Yup.string()
        .email("Некорректный e-mail")
        .required("Обязательное поле"),
      phone: Yup.string().matches(
        /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
        "Неверный формат телефона"
      ),
    }),
    onSubmit: (values) => {
      if (!compareObjects(initialData, values)) {
        const formData = {
          ...values,
          status: profile.status,
          avatarUser: profile.avatarUser,
        };

        const isRighData = JSON.stringify(profile) === JSON.stringify(formData);

        if (!isRighData) {
          const changedItems = Object.keys(profile).reduce((result, key) => {
            if (profile[key] !== formData[key]) {
              result[key] = formData[key];
            }
            return result;
          }, {});
          updateProfileUser(changedItems);
        }
      }
    },
  });

  const changeUserName = (e) => {
    formikPersonal.handleChange(e);
  };

  useEffect(() => {
    if (profile.length == 0) {
      getProfile();
    }
    scrollToTop();
  }, [getProfile, profile.length, scrollToTop]);

  useEffect(() => {
    if (profile.length !== 0 && profile.email) {
      const newData = {
        name: profile.name,
        surname: profile.surname,
        phone: profile.phone,
        email: profile.email.email,
      };
      formikPersonal.setValues(newData);
      setInitialData(newData);
      setAvatarUser(profile.avatarUser);
    }
  }, []);

  const itemsTabs = [
    {
      key: "1",
      label: "Личные данные",
      children: (
        <form
          onSubmit={formikPersonal.handleSubmit}
          className={style.personal__data}
        >
          <div className={style.personal__input__block}>
            <div className={style.input__block}>
              <p className={style.input__title}>Имя *</p>
              <InputProfile
                id="name"
                name="name"
                typeInput={"text"}
                value={formikPersonal.values.name}
                placeholder={"Иван"}
                onChange={changeUserName}
                errorChange={formikPersonal.errors.name && "true"}
              />
              {formikPersonal.errors.name && (
                <p className={style.error__message}>
                  {formikPersonal.errors.name}
                </p>
              )}
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
                errorChange={formikPersonal.errors.surname && "true"}
              />
              {formikPersonal.errors.surname && (
                <p className={style.error__message}>
                  {formikPersonal.errors.surname}
                </p>
              )}
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
                errorChange={formikPersonal.errors.email && "true"}
              />
              {formikPersonal.errors.email && (
                <p className={style.error__message}>
                  {formikPersonal.errors.email}
                </p>
              )}
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
                errorChange={formikPersonal.errors.phone && "true"}
                tel={"true"}
              />
              {formikPersonal.errors.phone && (
                <p className={style.error__message}>
                  {formikPersonal.errors.phone}
                </p>
              )}
            </div>
          </div>
          <p className={style.required__title}>
            * - поля обязательные для заполнения
          </p>
          <div className={style.button__save}>
            <ButtonCreate
              text={"Сохранить"}
              type={"submit"}
              disabled={Object.keys(formikPersonal.errors).length > 0}
            />
          </div>
        </form>
      ),
    },
    {
      key: "2",
      label: "Сброс пароля",
      children: (
        <form
          className={style.personal__data}
          onSubmit={formikPass.handleSubmit}
        >
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
                errorChange={formikPass.errors.prepassword && "true"}
              />
              {formikPass.errors.prepassword && (
                <p className={style.error__message}>
                  {formikPass.errors.prepassword}
                </p>
              )}
            </div>
            <button className={style.button__hidden__pass} onClick={hiddenPass}>
              {titleHiddenButton ? "Показать пароли" : "Скрыть пароли"}
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
                errorChange={formikPass.errors.password && "true"}
                ref={inputNewPass}
              />
              {formikPass.errors.password && (
                <p className={style.error__message}>
                  {formikPass.errors.password}
                </p>
              )}
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
                errorChange={formikPass.errors.confirmPassword && "true"}
                ref={inputDoublePass}
              />
              {formikPass.errors.confirmPassword && (
                <p className={style.error__message}>
                  {formikPass.errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className={style.button__save}>
            <ButtonCreate
              text={"Сбросить"}
              type={"submit"}
              disabled={Object.keys(formikPass.errors).length > 0}
            />
          </div>
        </form>
      ),
    },
  ];

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      await uploadAvatar(formData).then((response) => setAvatarUser(response));
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    logout();
    setProfile(null);
    navigate("/");
  };

  return (
    <section className={`${style.section_profile} wrapper`}>
      {contextHolder}
      <div className={style.bg_profile}></div>
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
              {
                profile.isActivated ?
                <p className={style.user__link_ok}>Подтвержден</p>
                :
                <p className={style.user__link_err}>Не подтвержден</p>
              }
              <p className={style.fullname__name}>
                {profile.name + " " + profile.surname}
              </p>
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

          <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
        </div>

        <div className={style.block__order}>
          <h3 className={style.order__title}>Мои заказы</h3>
          <Modal
            title="Товары заказа"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={900}
            footer={null}
          >
            {selectedItems.map((item, index) => (
                  <ModalProfileItem key={index} item={item}/>
            ))}
          </Modal>
          {order.length != 0 ? (
            <div className={style.block__orders}>
              {order.map((obj, index) => (
                <ProfileOrderItem
                  key={index}
                  favorite={true}
                  groupImage={obj.items}
                  {...obj}
                  onClick={showModal}
                />
              ))}
            </div>
          ) : (
            <div className={style.profile__block_null}>
              <div className={style.block__info}>
                <p className={style.title}>У вас нет заказов</p>
                <div className={style.btn_block}>
                  <ButtonNull title={"В каталог"} path={"/ready-gifts/all"} />
                  <ButtonNull title={"Собрать"} path={"/"} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
