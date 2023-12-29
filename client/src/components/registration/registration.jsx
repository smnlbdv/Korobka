import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import ButtonLogin from '../buttonLogin/buttonLogin.jsx';
import InputReg from '..//inputReg/inputReg.jsx';
import style from './registration.module.scss'
import api from '../../api/api.js'

const Registration = () => {

    const nav = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitInfo = async () => {
        try {
            await api.post('/api/auth/registration', {...form})
            .then(res => {
                if(res.status === 200) {
                    nav("/api/auth/login")
                }
            })

        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <div className={style.wrapper}>
            <div className={style.block_reg}>
                <h2 className="section__title">Регистарция</h2>
                <form className={style.form} onSubmit={e => e.preventDefault()}>
                    <InputReg img={"/assets/user-sign-up.svg"} name={"name"} type={"text"} placeholder={"Имя"} changeHandler={changeHandler}/>
                    <InputReg img={"/assets/email-sign-up.svg"} name={"email"} type={"email"} placeholder={"E-mail"} changeHandler={changeHandler}/>
                    <InputReg img={"/assets/lock-sign-up.svg"} name={"password"} type={"password"} placeholder={"Пароль"} chek={true} changeHandler={changeHandler}/>
                    <ButtonLogin title={"Зарегистрироваться"} submitInfo={() => submitInfo()}/>
                </form>
            </div>
        </div>
    );
}
 
export default Registration;