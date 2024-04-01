import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.js";

import style from './counterInput.module.scss'

// eslint-disable-next-line react/prop-types
const CounterInput = ({ counts, setCounts, _id, cartCheck }) => {
    const [input, setInput] = useState(false);
    const { increaseCartItem, decreaseCartItem, unmountItem, checkArray } = useContext(AuthContext);

    const subtractProduct = async () => {
      if (counts <= 1) {
        unmountItem(_id);
      } else {
        const resultDeCrease = decreaseCartItem(_id, cartCheck);
        if (resultDeCrease) {
          setCounts(counts - 1);
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
      if(checkArray.length !== 0 && cartCheck === false) {
        return
      } else {
        if (counts >= 200) {
          setCounts(counts);
        } else {
          const resultIncrease = increaseCartItem(_id, cartCheck);
          if (resultIncrease) {
            setCounts(counts + 1);
          }
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