import style from './inputProfile.module.scss'
import InputMask from 'react-input-mask';

// eslint-disable-next-line react/prop-types
const InputProfile = ({hiddenImage, typeInput, url, alt, placeholder, value = "", id, name, onChange, errorChange, tel}) => {
    return ( 
        <div className={errorChange ? style.block__input__error : style.block__input}>
            {hiddenImage && <img className={style.input__image} src={errorChange ? "/assets/lock-sign-up-error.svg" : url} alt={alt}/>}
            {!tel && <input className={style.profile__input} id={id} name={name} onChange={onChange} type={typeInput} placeholder={placeholder} value={value}/>}
            {tel && <InputMask mask="+375 (99) 999-99-99" className={style.profile__input} id={id} name={name} onChange={onChange} type={typeInput} placeholder={placeholder} value={value}/>}
        </div>
     );
}
 
export default InputProfile;