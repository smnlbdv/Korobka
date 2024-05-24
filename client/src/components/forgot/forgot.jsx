import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ButtonLogin from "../buttonLogin/buttonLogin.jsx";
import InputReg from "../inputReg/inputReg.jsx";
import style from "./forgot.module.scss";
import api from "../../api/api.js";
import { useFormik } from "formik";
import * as Yup from "yup";

const Forgot = () => {
  const formikForgot = useFormik({
    initialValues: {
      email: "",
      password: "",
      twopassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный e-mail")
        .required("Обязательное поле")
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={style.wrapper}>
      <div className={style.block_reg}>
        <h2 className="section__title">Сброс пароля</h2>
        <form className={style.form} onSubmit={formikForgot.handleSubmit}>
          <InputReg
            id="email"
            img={"/assets/email-sign-up.svg"}
            name={"email"}
            type={"text"}
            onChange={formikForgot.handleChange}
            placeholder={"E-mail"}
            value={formikForgot.values.email}
            errorChange={formikForgot.errors.email && "true"}
          />
          <ButtonLogin title={"Сбросить пароль"} />
        </form>
      </div>
    </div>
  );
};

export default Forgot;
