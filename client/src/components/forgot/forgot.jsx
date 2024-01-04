import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import ButtonLogin from '../buttonLogin/buttonLogin.jsx';
import InputReg from '../inputReg/inputReg.jsx';
import style from './forgot.module.scss'
import api from '../../api/api.js'
import { AuthContext } from "../../context/authContext.js";

const Forgot = () => {

    const nav = useNavigate()

    const [form, setForm] = useState({
        password: '',
        twopassword: ''
    })

    const { login } = useContext(AuthContext)

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitInfo = async () => {
        try {
            await api.post('/api/auth/login', {...form})
            .then(res => {
                login(res.data.token, res.data.userId)
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
                <h2 className="section__title">Сброс пароля</h2>
                <form className={style.form} onSubmit={e => e.preventDefault()}>
                    <InputReg img={"/assets/email-sign-up.svg"} name={"email"} type={"email"} placeholder={"E-mail"} changeHandler={changeHandler}/>
                    <ButtonLogin title={"Сбросить пароль"} submitInfo={() => submitInfo()}/>
                </form>
            </div>
        </div>
    );
}
 
export default Forgot;