/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import '../../libs/ant.css'
// import CartItem from '../../components/cartItem/cartItem.jsx'
// import ButtonNull from "../../components/buttonNull/buttonNull.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";
import style from "./profile.module.scss";
import ButtonCreate from "../../components/buttonCreate/buttonCreate.jsx";

const Profil = () => {
//   const [checkAll, setCheckAll] = useState(false);
//   const [totalPrice, setPriceTotal] = useState();
  const { uploadAvatar, profile, getProfile, logout } = useContext(AuthContext);
  const avatarUser = useRef()
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  useEffect(() => {
    if(profile.length == 0 ) {
        getProfile()
    }
  }, [])

  const handleChangeFile = async (e) => {
    try {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append('image', file)
        await uploadAvatar(formData)
              .then(response => avatarUser.current.src = response)
    } catch (error) {
        console.log(error)
    }
  };

  const logoutUser = () => {
    logout()
    navigate("/");
  }

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
              <p className={style.fullname__name}>{profile.name}</p>
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
                  inputFileRef.current.click()
                  e.preventDefault()
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
              <form className={style.personal__data}>
                <div className={style.personal__input__block}>
                    <div className={style.input__block}>
                      <p className={style.input__title}>Имя</p>
                      <InputProfile typeInput={"text"} placeholder={"Иван"}/>
                    </div>
                    <div className={style.input__block}>
                      <p className={style.input__title}>Фамилия</p>
                      <InputProfile typeInput={"text"} placeholder={"Иванов"}/>
                    </div>
                </div>
                <div className={style.personal__input__block}>
                      <div className={style.input__block}>
                        <p className={style.input__title}>E-mail</p>
                        <InputProfile typeInput={"text"} placeholder={"ivanov@gmail.com"}/>
                      </div>
                      <div className={style.input__block}>
                        <p className={style.input__title}>Номер телефона</p>
                        <InputProfile typeInput={"text"} placeholder={"+375 (99) 999-99-99"}/>
                      </div>
                </div>
                <div className={style.button__save}>
                    <ButtonCreate text={"Сохранить"} type={"submit"}/>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Сброс пароля" key="2">
              <form className={style.personal__data}>
                  <div className={style.personal__input__block}>
                      <div className={style.input__block}>
                        <p className={style.input__title}>Старый пароль</p>
                        <InputProfile typeInput={"text"} hiddenImage={true} url={'/assets/lock-sign-up.svg'} placeholder={""}/>
                      </div>
                      <button className={style.button__hidden__pass}>Показать пароли</button>
                  </div>
                  <div className={style.personal__input__block}>
                        <div className={style.input__block}>
                          <p className={style.input__title}>Новый пароль</p>
                          <InputProfile typeInput={"text"} hiddenImage={true} url={'/assets/lock-sign-up.svg'} placeholder={""}/>
                        </div>
                        <div className={style.input__block}>
                          <p className={style.input__title}>Повторите пароль</p>
                          <InputProfile typeInput={"text"} hiddenImage={true} url={'/assets/lock-sign-up.svg'} placeholder={""}/>
                        </div>
                  </div>
                  <div className={style.button__save}>
                    <ButtonCreate text={"Сбросить"} type={"submit"}/>
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
