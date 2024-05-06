import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import ButtonLogin from "../buttonLogin/buttonLogin.jsx";
import InputReg from "../inputReg/inputReg.jsx";
import style from "./login.module.scss";
import api from "../../api/api.js";
import { AuthContext } from "../../context/authContext.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный e-mail")
        .required("Обязательное поле"),
      password: Yup.string()
        .required("Обязательное поле")
        .min(5, "Минимальная длина пароля 5 символов"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        await api.post("/api/auth/login", values).then((res) => {
          login(res.data.token, res.data.userId, res.data.role);
          if (res.status === 200) {
            nav("/");
          }
        });
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <div className={style.wrapper}>
      <div className={style.block_reg}>
        <h2 className="section__title">Вход</h2>
        <form className={style.form} onSubmit={formikLogin.handleSubmit}>
          <InputReg
            id="email"
            value={formikLogin.values.email}
            img={"/assets/email-sign-up.svg"}
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            onChange={formikLogin.handleChange}
            errorChange={formikLogin.errors.email && "true"}
          />
          <InputReg
            id="password"
            value={formikLogin.values.password}
            img={"/assets/lock-sign-up.svg"}
            name={"password"}
            type={"password"}
            placeholder={"Пароль"}
            chek={true}
            onChange={formikLogin.handleChange}
            errorChange={formikLogin.errors.password && "true"}
          />
          <ButtonLogin title={"Войти"} />
        </form>
        <div className={style.navigation}>
          <div className={style.navigation__item}>
            <p className={style.navigation__text}>Нет профиля?</p>
            <a
              className={style.navigation__link}
              href="http://localhost:5173/api/auth/registration"
            >
              Зарегистрироватся
            </a>
          </div>
          <div className={style.navigation__item}>
            <p className={style.navigation__text}>Забыли пароль?</p>
            <a
              className={style.navigation__link}
              href="http://localhost:5173/api/auth/forgot"
            >
              Сбросить пароль
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
