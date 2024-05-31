import style from './likeButton.module.scss'
import api from '../../api/api';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useAuth } from '../../hooks/auth.hook';

// eslint-disable-next-line react/prop-types
const LikeButton = ({id, countLikes, setCountLikes, likes}) => {

    
    const [isLike, setIsLike] = useState(false)
    const {openNotificationError} = useContext(AuthContext)
    const {userId} = useAuth()

    useEffect(() => {
        setIsLike(likes.includes(userId))
    }, [likes, userId])

    const likeReview = async () => {
        try {
            await api.post(`/api/reviews/like-review/${id}`)
                     .then((response) => {
                        console.log(response.data);
                        if(response.data.liked) {
                            setIsLike(response.data.liked)
                            setCountLikes(response.data.like)
                        } else {
                            setIsLike(response.data.liked)
                            setCountLikes(response.data.like)
                        }
                     })
        } catch (error) {
            openNotificationError('bottomRight', "Ошибка");
        }
    }

    return ( 
        <div className={isLike ? style.likes__review_true : style.likes__review} onClick={likeReview}>
            <img src="/assets/like.svg" alt="Icon like" />
            <p>{countLikes}</p>
        </div>
     );
}
 
export default LikeButton;