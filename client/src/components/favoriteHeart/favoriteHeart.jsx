import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from './favoriteHeart.module.scss'

// eslint-disable-next-line react/prop-types
const FavoriteHeart = ({_id, favorite}) => {

    const [isFavorite, setIsFavorite] = useState(favorite);

    const { addProductFavorite, deleteProductFavorite } = useContext(AuthContext)

    const clickHeart = () => {
        if(isFavorite) {
            deleteProductFavorite(_id)
            setIsFavorite(false)
        } else {
            addProductFavorite(_id) 
            setIsFavorite(true)
        }
    }
    
    return ( 
        <div className={!isFavorite ? style.button__add_favorite : style.button__add_favorite_love} onClick={clickHeart}>
            <img className={style.favorite} src={isFavorite ? "/assets/favorite-love.svg" : "/assets/love.svg"} alt=""/>
        </div>
     );
}
 
export default FavoriteHeart;