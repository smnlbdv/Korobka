import { forwardRef } from 'react';
import style from './inputProfile.module.scss'
import mask from './mask.js'

// eslint-disable-next-line react/prop-types, react/display-name
const InputProfile = forwardRef(({ hiddenImage = false, typeInput = "text", url, alt, placeholder, value = "", id, name, onChange, errorChange, tel = false }, ref) => {

    const validNumber = (event) => {
        const value = mask(event);
        onChange(value);
    };
    
    return (
        <div className={errorChange ? style.block__input__error : style.block__input}>
            {hiddenImage && <img className={style.input__image} src={errorChange ? "/assets/lock-sign-up-error.svg" : url} alt={alt}/>}
            {!tel && <input className={style.profile__input} ref={ref} id={id} name={name} onChange={onChange} type={typeInput} placeholder={placeholder} value={value} />}
            {tel && <input className={style.profile__input} ref={ref} id={id} name={name} onChange={validNumber} type={typeInput} placeholder={placeholder} value={value} />}
        </div>
    );
});

export default InputProfile;