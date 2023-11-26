import ButtonLogin from '../../components/buttonLogin/buttonLogin';
import InputReg from '../../components/inputReg/inputReg';
import style from './register.module.scss'

const Register = () => {
    const submitInfo = (e) => {
        e.preventDefault();
        console.log(e)
    }
    return (
        <div className={style.wrapper}>
            <div className={style.block_reg}>
                <h2 className="section__title">Регистарция</h2>
                <form className={style.form} action='http://localhost:3001/register' onSubmit={submitInfo}>
                    <InputReg img={"./assets/user-sign-up.svg"} name={"user"} type={"text"} placeholder={"Имя"}/>
                    <InputReg img={"./assets/email-sign-up.svg"} name={"user"} type={"email"} placeholder={"E-mail"}/>
                    <InputReg img={"./assets/lock-sign-up.svg"} name={"user"} type={"password"} placeholder={"Пароль"} chek={true}/>
                    <InputReg img={"./assets/lock-sign-up.svg"} name={"user"} type={"password"} placeholder={"Повторите пароль"} chek={true}/>
                    <ButtonLogin title={"Зарегистрироваться"}/>
                </form>
            </div>
        </div>
    );
}
 
export default Register;