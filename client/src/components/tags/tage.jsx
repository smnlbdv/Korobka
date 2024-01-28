import style from './tage.module.scss'

// eslint-disable-next-line react/prop-types
const Tage = ({text}) => {
    return ( 
        <div className={style.tage__block}>
            {text}
        </div>
     );
}
 
export default Tage;