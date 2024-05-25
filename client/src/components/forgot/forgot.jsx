import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ButtonLogin from "../buttonLogin/buttonLogin.jsx";
import InputReg from "../inputReg/inputReg.jsx";
import style from "./forgot.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/authContext.js";

const Forgot = () => {

  const { postResetPassword, contextHolder } = useContext(AuthContext)

  const formikForgot = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный e-mail")
        .required("Обязательное поле")
    }),
    onSubmit: async (values) => {
      postResetPassword(values)
    },
  });

  return (
    <>
      {contextHolder}
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
            <ButtonLogin title={"Отправить"} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
