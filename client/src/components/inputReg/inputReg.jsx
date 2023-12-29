/* eslint-disable react/prop-types */
import { useState } from "react";

import style from './inputReg.module.scss'


const InputReg = ({img, name, placeholder, type, chek = false, changeHandler}) => {

    const [show, setShow] = useState(false)

    const showPass = async () => {
        setShow(!show)
    }

    return ( 
        <div className={style.input_block}>
            <div className={style.main_input_block}>
                <img className={style.img} src={img} alt="" />
                <input className={style.input} name={name} type={show ? "text" : type} placeholder={placeholder} onChange={changeHandler} required/>
            </div>
            {
                chek && <img  className={style.img_secret} src="/assets/secret.svg" alt="secret" onClick={showPass} />
            }
        </div>
    );
}
 
export default InputReg;