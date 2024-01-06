import style from './inputProfile.module.scss'

// eslint-disable-next-line react/prop-types
const InputProfile = ({hiddenImage, typeInput, url, alt, placeholder}) => {
    return ( 
        <div className={style.block__input}>
            {hiddenImage && <img className={style.input__image} src={url} alt={alt}/>}
            <input className={style.profile__input } type={typeInput} placeholder={placeholder} />
        </div>
     );
}
 
export default InputProfile;