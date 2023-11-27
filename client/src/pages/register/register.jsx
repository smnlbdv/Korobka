import { useState } from "react";

import ButtonLogin from '../../components/buttonLogin/buttonLogin';
import InputReg from '../../components/inputReg/inputReg';
import style from './register.module.scss'
import api from './../../api/api.js'

const Register = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        passwordHash: ''
    })

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitInfo = async () => {
        try {
            await api.post('/api/auth/registration', {...form})
            .then(res => alert(res.data.message))

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className={style.wrapper}>
            <div className={style.block_reg}>
                <h2 className="section__title">Регистарция</h2>
                <form className={style.form} onSubmit={e => e.preventDefault()}>
                    <InputReg img={"./assets/user-sign-up.svg"} name={"name"} type={"text"} placeholder={"Имя"} changeHandler={changeHandler}/>
                    <InputReg img={"./assets/email-sign-up.svg"} name={"email"} type={"email"} placeholder={"E-mail"} changeHandler={changeHandler}/>
                    <InputReg img={"./assets/lock-sign-up.svg"} name={"passwordHash"} type={"password"} placeholder={"Пароль"} chek={true} changeHandler={changeHandler}/>
                    <ButtonLogin title={"Зарегистрироваться"} submitInfo={() => submitInfo()}/>
                </form>
            </div>
        </div>
    );
}
 
export default Register;