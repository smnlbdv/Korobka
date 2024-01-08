import style from './inputProfile.module.scss'

// eslint-disable-next-line react/prop-types
const InputProfile = ({hiddenImage, typeInput, url, alt, placeholder, value = "", id, name, onChange, errorChange}) => {
    return ( 
        <div className={errorChange ? style.block__input__error : style.block__input}>
            {hiddenImage && <img className={style.input__image} src={url} alt={alt}/>}
            <input className={style.profile__input} id={id} name={name} onChange={onChange} type={typeInput} placeholder={placeholder} value={value}/>
        </div>
     );
}
 
export default InputProfile;