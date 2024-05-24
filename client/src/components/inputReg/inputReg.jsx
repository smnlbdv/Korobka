/* eslint-disable react/prop-types */
import { useState } from "react";

import style from './inputReg.module.scss'


const InputReg = ({id, img, name, placeholder, onChange, type, chek = false, value = "", errorChange}) => {

    const [show, setShow] = useState(false)

    const showPass = async () => {
        setShow(!show)
    }

    return ( 
        <div className={errorChange ? style.input__error : style.input_block}>
            <div className={style.main_input_block}>
                <img className={style.img} src={img} alt="" />
                <input className={style.input} name={name} id={id} type={show ? "text" : type} value={value} placeholder={placeholder} onChange={onChange} required/>
            </div>
            {
                chek && <img  className={style.img_secret} src="/assets/secret.svg" alt="secret" onClick={showPass} />
            }
        </div>
    );
}
 
export default InputReg;