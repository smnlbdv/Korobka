import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from './counterInput.module.scss'
import { CartContext } from "../../context/cartContext.js";

// eslint-disable-next-line react/prop-types
const CounterInput = ({ counts, setCounts, _id, cartCheck }) => {
    const [input, setInput] = useState(false);
    const { increaseCartItem, decreaseCartItem, unmountItem, cart} = useContext(AuthContext);
    const { calculatePrice, checkArray  } = useContext(CartContext);

    const subtractProduct = async () => {
      if (counts <= 1) {
        unmountItem(_id);
      } else {
        if (!cartCheck && checkArray.length === 0) {
          const resultIncrease = increaseCartItem(_id);
          if (resultIncrease) {
            setCounts(counts - 1);
            let countsNew = counts - 1
            calculatePrice(cart, countsNew);
          }
        } else if (checkArray.some(item => item._id === _id)) {
          const resultIncrease = increaseCartItem(_id);
          if (resultIncrease) {
            setCounts(counts - 1);
            let countsNew = counts - 1
            calculatePrice(checkArray, countsNew);
          }
        } else {
          return
        }
      }
    };

    const handleChange = (e) => {
      if (e.target.value > 200) {
        setCounts(200);
      } else {
        setCounts(Number(e.target.value));
      }
    };

    const changeOnInput = () => {
      setInput(true);
    };
  
    const onBlurInput = () => {
      setInput(false);
    };

    const addProduct = async () => {
      if (counts >= 200) {
        setCounts(counts);
      } else {
        if (!cartCheck && checkArray.length === 0) {
          const resultIncrease = increaseCartItem(_id);
          if (resultIncrease) {
            setCounts(counts + 1);
            let countsNew = counts + 1
            calculatePrice(cart, countsNew);
          }
        } else if (checkArray.some(item => item._id === _id)) {
          const resultIncrease = increaseCartItem(_id);
          if (resultIncrease) {
            setCounts(counts + 1);
            let countsNew = counts + 1
            calculatePrice(checkArray, countsNew);
          }
        } else {
          return
        }
      }
    };
    return ( 
        <div className={style.counter__block}>
            <button className={style.btn_counter} onClick={subtractProduct}>
                <img className={style.counter_icon} src="/assets/btn-cart-minus.svg" alt="" />
            </button>
            {
                input ?
                <input className={style.count_input} type="text" value={counts} onChange={handleChange} onBlur={onBlurInput}/>
                :
                <p className={style.count} onClick={changeOnInput}>{counts}</p>
            }
            <button className={style.btn_counter} onClick={addProduct}>
                <img className={style.counter_icon} src="/assets/btn-cart-plus.svg" alt="" />
            </button>
        </div>
     );
}
 
export default CounterInput;