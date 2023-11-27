/* eslint-disable react/prop-types */
import style from './answerCard.module.scss'

const AnswerCard = ({id, image, title, text, openAnswer, open}) => {

    if(open == id) {
        open = true;
    } else {
        open = false;
    }
    
    return ( 
        <div className={`${style.answer_block} ${open ? style.open : ''} answer_item`} id="answers">
            <div className={style.answer_info}>
                <div className={style.image_block}>
                    <img className={style.answer_image} src={image} alt="answer" onClick={() => openAnswer(id)}/>
                </div>
                <div className={style.block_text}>
                    <h2 className={style.answer_title}>{title}</h2>
                    <p className={style.answer_text}>{text}</p>
                </div>
            </div>
        </div>
    );
}
 
export default AnswerCard;