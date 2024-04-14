import style from './likeButton.module.scss'

// eslint-disable-next-line react/prop-types
const LikeButton = ({likes}) => {
  
    return ( 
        <div className={style.likes__review}>
            <img src="/assets/like.svg" alt="Icon like" />
            <p>{likes}</p>
        </div>
     );
}
 
export default LikeButton;