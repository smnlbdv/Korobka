import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import ButtonLogin from '../buttonLogin/buttonLogin.jsx';
import InputReg from '../inputReg/inputReg.jsx';
import style from './login.module.scss'
import api from '../../api/api.js'
import { AuthContext } from "../../context/authContext.js";

const Login = () => {

    const nav = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { login } = useContext(AuthContext)

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitInfo = async () => {
        try {
            await api.post('/api/auth/login', {...form})
            .then(res => {
                login(res.data.token, res.data.userId, res.data.role)
                if(res.status === 200) {
                    nav("/")
                }
            })

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className={style.wrapper}>
            <div className={style.block_reg}>
                <h2 className="section__title">Вход</h2>
                <form className={style.form} onSubmit={e => e.preventDefault()}>
                    <InputReg img={"/assets/email-sign-up.svg"} name={"email"} type={"email"} placeholder={"E-mail"} changeHandler={changeHandler}/>
                    <InputReg img={"/assets/lock-sign-up.svg"} name={"password"} type={"password"} placeholder={"Пароль"} chek={true} changeHandler={changeHandler}/>
                    <ButtonLogin title={"Войти"} submitInfo={() => submitInfo()}/>
                </form>
                <div className={style.navigation}>
                    <div className={style.navigation__item}>
                        <p className={style.navigation__text}>Нет профиля?</p>
                        <a className={style.navigation__link} href="http://localhost:5173/api/auth/registration">Зарегистрироватся</a>
                    </div>
                    <div className={style.navigation__item}>
                        <p className={style.navigation__text}>Забыли пароль?</p>
                        <a className={style.navigation__link} href="http://localhost:5173/api/auth/forgot">Сбросить пароль</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;