import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import ButtonLogin from "../buttonLogin/buttonLogin.jsx";
import InputReg from "..//inputReg/inputReg.jsx";
import style from "./registration.module.scss";
import api from "../../api/api.js";

const Registration = () => {
  const nav = useNavigate();

  const formikRegistration = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Обязательное поле')
        .max(50, 'Превышено кол-во допустимых символов')
        .min(2, 'Слишком короткое имя'),
     surname: Yup.string()
        .required('Обязательное поле')
        .max(50, 'Превышено кол-во допустимых символов'),
     email: Yup.string()
        .email('Некорректный e-mail')
        .required('Обязательное поле'),
     password: Yup.string()
        .required('Обязательное поле')
        .min(5, 'Минимальная длина пароля 5 символов'),
    }),
    onSubmit: async (values) => {
        try {
            await api.post("/api/auth/registration", values).then((res) => {
            if (res.status === 200) {
                nav("/api/auth/login");
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
        <h2 className="section__title">Регистарция</h2>
        <form className={style.form} onSubmit={formikRegistration.handleSubmit}>
          <InputReg
            id="name"
            value={formikRegistration.values.name}
            img={"/assets/user-sign-up.svg"}
            name={"name"}
            type={"text"}
            placeholder={"Имя"}
            onChange={formikRegistration.handleChange}
            errorChange={formikRegistration.errors.name && "true"}
          />
          <InputReg
            id="surname"
            value={formikRegistration.values.surname}
            img={"/assets/user-sign-up.svg"}
            name={"surname"}
            type={"text"}
            placeholder={"Фамилия"}
            onChange={formikRegistration.handleChange}
            errorChange={formikRegistration.errors.surname && "true"}
          />
          <InputReg
            id="email"
            value={formikRegistration.values.email}
            img={"/assets/email-sign-up.svg"}
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            onChange={formikRegistration.handleChange}
            errorChange={formikRegistration.errors.email && "true"}
          />
          <InputReg
            id="password"
            value={formikRegistration.values.password}
            img={"/assets/lock-sign-up.svg"}
            name={"password"}
            type={"password"}
            placeholder={"Пароль"}
            onChange={formikRegistration.handleChange}
            errorChange={formikRegistration.errors.password && "true"}
            chek={true}
          />
          <ButtonLogin
            title={"Зарегистрироваться"}
          />
        </form>
      </div>
    </div>
  );
};

export default Registration;
